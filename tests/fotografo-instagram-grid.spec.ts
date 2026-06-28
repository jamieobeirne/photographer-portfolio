import { test, expect } from '@playwright/test';

/**
 * Specification tests for the /fotografo Instagram-style grid.
 *
 * These tests define the DESIRED layout and will fail until the grid is
 * redesigned to match the Instagram profile-page pattern:
 *
 *   - 3 equal columns, edge-to-edge (no horizontal padding)
 *   - ≤ 4px gap between cells  (Instagram uses 3px)
 *   - Square (1:1) thumbnail cells
 *   - Every cell contains an <img> that fills it (object-cover)
 *   - No caption text below thumbnails inside the grid
 *
 * Reference: https://nahuelbeadeph.wixsite.com/nahuelbeadeph
 */

const DESKTOP = { width: 1280, height: 900 };
const MOBILE  = { width: 390,  height: 844 };
const MAX_GAP_PX = 4;

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Return the computed style of the first grid that is wider than 80 % of the viewport. */
function findPortfolioGrid(doc: Document) {
  const grids = Array.from(doc.querySelectorAll('[class*="grid"]')) as HTMLElement[];
  return grids.find(el => el.getBoundingClientRect().width > window.innerWidth * 0.8) ?? null;
}

// ─── desktop ──────────────────────────────────────────────────────────────────

test.describe('/fotografo — Instagram grid (desktop 1280px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/fotografo');
  });

  test('portfolio grid has exactly 3 equal columns', async ({ page }) => {
    const result = await page.evaluate(() => {
      const grid = (window as any).__findGrid?.() ??
        Array.from(document.querySelectorAll('[class*="grid"]'))
          .find((el) => el.getBoundingClientRect().width > window.innerWidth * 0.8);
      if (!grid) return { count: 0, raw: 'no grid found' };
      const raw = window.getComputedStyle(grid as Element).gridTemplateColumns;
      const parts = raw.trim().split(/\s+/);
      return { count: parts.length, raw };
    });

    expect(
      result.count,
      `Expected 3 columns — got ${result.count} (gridTemplateColumns: "${result.raw}")`
    ).toBe(3);
  });

  test('gap between cells is ≤ 4px', async ({ page }) => {
    const gap = await page.evaluate(() => {
      const grids = Array.from(document.querySelectorAll('[class*="grid"]')) as HTMLElement[];
      let max = 0;
      for (const el of grids) {
        const s = window.getComputedStyle(el);
        max = Math.max(max, parseFloat(s.columnGap) || 0, parseFloat(s.rowGap) || 0);
      }
      return max;
    });

    expect(
      gap,
      `Gap is ${gap}px — must be ≤ ${MAX_GAP_PX}px for an Instagram-style tight grid`
    ).toBeLessThanOrEqual(MAX_GAP_PX);
  });

  test('thumbnail cells are square (aspect ratio 1:1 ± 5 %)', async ({ page }) => {
    const cells = await page.evaluate(() => {
      const grids = Array.from(document.querySelectorAll('[class*="grid"]')) as HTMLElement[];
      for (const grid of grids) {
        const children = Array.from(grid.children);
        if (children.length === 0) continue;
        return children.slice(0, 9).map((el) => {
          const r = el.getBoundingClientRect();
          return { w: Math.round(r.width), h: Math.round(r.height) };
        });
      }
      return [] as { w: number; h: number }[];
    });

    expect(cells.length, 'No grid cells found').toBeGreaterThan(0);

    for (const { w, h } of cells) {
      const ratio = w / h;
      expect(
        ratio,
        `Cell is ${w}×${h}px (ratio ${ratio.toFixed(2)}) — expected square (1:1 ± 5 %)`
      ).toBeCloseTo(1, 1);
    }
  });

  test('grid spans full viewport width — edge-to-edge layout', async ({ page }) => {
    const { left, right, vw } = await page.evaluate(() => {
      const grids = Array.from(document.querySelectorAll('[class*="grid"]')) as HTMLElement[];
      for (const el of grids) {
        const r = el.getBoundingClientRect();
        if (r.width > window.innerWidth * 0.8)
          return { left: Math.round(r.left), right: Math.round(r.right), vw: window.innerWidth };
      }
      return { left: -1, right: -1, vw: window.innerWidth };
    });

    expect(left,  `Grid left edge is ${left}px — should be ≤ 2px from viewport`).toBeLessThanOrEqual(2);
    expect(right, `Grid right edge is ${right}px — should reach ${vw - 2}px+`).toBeGreaterThanOrEqual(vw - 2);
  });

  test('every thumbnail cell contains a visible <img>', async ({ page }) => {
    const results = await page.evaluate(() => {
      const grids = Array.from(document.querySelectorAll('[class*="grid"]')) as HTMLElement[];
      for (const grid of grids) {
        const children = Array.from(grid.children);
        if (children.length === 0) continue;
        return children.map((cell) => ({
          hasImg: !!cell.querySelector('img'),
          text: cell.textContent?.trim() ?? '',
        }));
      }
      return [] as { hasImg: boolean; text: string }[];
    });

    expect(results.length, 'No grid cells found').toBeGreaterThan(0);

    const missing = results.filter((r) => !r.hasImg);
    expect(
      missing.length,
      `${missing.length} cell(s) have no <img> element`
    ).toBe(0);
  });

  test('no caption text is rendered below thumbnails inside the grid', async ({ page }) => {
    const captions = await page.evaluate(() => {
      const grids = Array.from(document.querySelectorAll('[class*="grid"]')) as HTMLElement[];
      for (const grid of grids) {
        const children = Array.from(grid.children);
        if (children.length === 0) continue;
        return children.map((cell) => {
          const img = cell.querySelector('img');
          if (!img) return '';
          return Array.from(cell.querySelectorAll('p, span, figcaption, h1, h2, h3, h4'))
            .map((el) => el.textContent?.trim() ?? '')
            .filter(Boolean)
            .join(' ');
        });
      }
      return [] as string[];
    });

    const withText = captions.filter((t) => t.length > 0);
    expect(
      withText.length,
      `${withText.length} cell(s) have visible caption text: ${withText.slice(0, 3).join(' | ')}`
    ).toBe(0);
  });
});

// ─── mobile ───────────────────────────────────────────────────────────────────

test.describe('/fotografo — Instagram grid (mobile 390px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto('/fotografo');
  });

  test('grid still has 3 columns on mobile', async ({ page }) => {
    const count = await page.evaluate(() => {
      const grids = Array.from(document.querySelectorAll('[class*="grid"]')) as HTMLElement[];
      for (const el of grids) {
        const raw = window.getComputedStyle(el).gridTemplateColumns;
        const parts = raw.trim().split(/\s+/);
        if (parts.length === 3) return 3;
      }
      return 0;
    });

    expect(
      count,
      `Mobile grid has ${count} column(s) — Instagram always shows 3 columns`
    ).toBe(3);
  });

  test('thumbnail cells are square on mobile', async ({ page }) => {
    const cells = await page.evaluate(() => {
      const grids = Array.from(document.querySelectorAll('[class*="grid"]')) as HTMLElement[];
      for (const grid of grids) {
        const children = Array.from(grid.children);
        if (children.length === 0) continue;
        return children.slice(0, 6).map((el) => {
          const r = el.getBoundingClientRect();
          return { w: Math.round(r.width), h: Math.round(r.height) };
        });
      }
      return [] as { w: number; h: number }[];
    });

    expect(cells.length, 'No grid cells found on mobile').toBeGreaterThan(0);
    for (const { w, h } of cells) {
      expect(w / h, `Mobile cell ${w}×${h}px is not square`).toBeCloseTo(1, 1);
    }
  });
});
