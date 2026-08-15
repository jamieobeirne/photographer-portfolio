import { test, expect } from '@playwright/test';

/**
 * Specification tests for the /fotografo home mosaic.
 *
 * SUPERSEDES the June spec (3 equal square cells, 90vw container). Nahuel's
 * 21 July notes changed the target: he wants the home to read like his old
 * Wix feed — "3 fotos de cada producción en diferentes tamaños generando un
 * patrón irregular", edge to edge, with smaller tiles than before.
 *
 * Desired layout:
 *   - CSS multi-column flow: 2 columns in portrait, 3 from 640px, 4 from 1280px
 *   - ≤ 4px gutters (Instagram uses 3px)
 *   - Tiles keep their own aspect ratios — explicitly NOT all square
 *   - Container is full-bleed in portrait, aligned to the menu margin above it
 *
 * Reference: https://nahuelbeadeph.wixsite.com/nahuelbeadeph
 */

const DESKTOP = { width: 1280, height: 900 };
const TABLET = { width: 900, height: 1000 };
const MOBILE = { width: 390, height: 844 };
const MAX_GAP_PX = 4;

const mosaicMetrics = () => {
  const el = document.querySelector('.photo-mosaic') as HTMLElement | null;
  if (!el) return null;
  const style = window.getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const cells = Array.from(el.children).map((child) => {
    const r = child.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), hasImg: !!child.querySelector('img') };
  });
  return {
    columnCount: style.columnCount,
    columnGap: parseFloat(style.columnGap) || 0,
    width: rect.width,
    left: Math.round(rect.left),
    viewport: window.innerWidth,
    cells,
  };
};

test.describe('/fotografo — photo mosaic', () => {
  for (const [name, viewport, expectedColumns] of [
    ['desktop 1280px', DESKTOP, '4'],
    ['tablet 900px', TABLET, '3'],
    ['mobile 390px', MOBILE, '2'],
  ] as const) {
    test(`${name}: flows into ${expectedColumns} columns`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/fotografo');
      const metrics = await page.evaluate(mosaicMetrics);

      expect(metrics, 'No .photo-mosaic container found').not.toBeNull();
      expect(
        metrics!.columnCount,
        `Expected ${expectedColumns} columns at ${viewport.width}px — got ${metrics!.columnCount}`
      ).toBe(expectedColumns);
    });
  }

  test('gutters are ≤ 4px', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/fotografo');
    const metrics = await page.evaluate(mosaicMetrics);

    expect(metrics).not.toBeNull();
    expect(
      metrics!.columnGap,
      `Column gap is ${metrics!.columnGap}px — must be ≤ ${MAX_GAP_PX}px for a tight feed`
    ).toBeLessThanOrEqual(MAX_GAP_PX);
  });

  test('mobile mosaic is effectively full-bleed', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto('/fotografo');
    const metrics = await page.evaluate(mosaicMetrics);

    expect(metrics).not.toBeNull();
    // 21 July #17 — Nahuel asked for little or no black margin in portrait.
    const margin = metrics!.viewport - metrics!.width;
    expect(
      margin,
      `Mosaic leaves ${margin}px of total horizontal margin — expected ≤ 24px in portrait`
    ).toBeLessThanOrEqual(24);
  });

  test('tiles are not uniform — real photos keep their own aspect ratios', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/fotografo');
    const metrics = await page.evaluate(mosaicMetrics);

    expect(metrics).not.toBeNull();
    const withPhotos = metrics!.cells.filter((c) => c.hasImg);

    // Without a reachable WordPress the page renders placeholder cells; the
    // aspect-ratio assertion only makes sense once real photos are present.
    test.skip(withPhotos.length < 4, 'No photos returned from WordPress — placeholder state');

    const ratios = withPhotos.map((c) => c.w / c.h);
    const distinct = new Set(ratios.map((r) => r.toFixed(1)));
    expect(
      distinct.size,
      `All ${withPhotos.length} tiles share the same aspect ratio — the mosaic should be irregular`
    ).toBeGreaterThan(1);
  });
});
