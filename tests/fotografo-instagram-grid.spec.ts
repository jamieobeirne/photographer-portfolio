import { test, expect } from '@playwright/test';

/**
 * Specification tests for the /fotografo home mosaic.
 *
 * SUPERSEDES the 21 July multi-column spec. That version flowed photos through
 * CSS columns at their own aspect ratios, which made tiles differ in height but
 * never in width — so a production shot on one camera, at one aspect ratio,
 * rendered as a plain grid. 17 Aug: tiles now differ in SIZE, via a dense CSS
 * grid with wide / tall / big spans on a period-11 pattern.
 *
 * Desired layout:
 *   - CSS grid: 2 columns in portrait, 3 from 640px, 4 from 1280px
 *   - <= 4px gutters (Instagram uses 3px)
 *   - Tiles are NOT uniform — several distinct widths and heights are present
 *   - 2-column spans are suppressed in portrait, where they would be full-bleed
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
    trackCount: style.gridTemplateColumns.split(' ').filter(Boolean).length,
    columnGap: parseFloat(style.columnGap) || 0,
    width: rect.width,
    left: Math.round(rect.left),
    viewport: window.innerWidth,
    cells,
  };
};

test.describe('/fotografo — photo mosaic', () => {
  for (const [name, viewport, expectedColumns] of [
    ['desktop 1280px', DESKTOP, 4],
    ['tablet 900px', TABLET, 3],
    ['mobile 390px', MOBILE, 2],
  ] as const) {
    test(`${name}: lays out in ${expectedColumns} columns`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/fotografo');
      const metrics = await page.evaluate(mosaicMetrics);

      expect(metrics, 'No .photo-mosaic container found').not.toBeNull();
      expect(
        metrics!.trackCount,
        `Expected ${expectedColumns} grid columns at ${viewport.width}px — got ${metrics!.trackCount}`
      ).toBe(expectedColumns);
    });
  }

  test('gutters are <= 4px', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/fotografo');
    const metrics = await page.evaluate(mosaicMetrics);

    expect(metrics).not.toBeNull();
    expect(
      metrics!.columnGap,
      `Column gap is ${metrics!.columnGap}px — must be <= ${MAX_GAP_PX}px for a tight feed`
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
      `Mosaic leaves ${margin}px of total horizontal margin — expected <= 24px in portrait`
    ).toBeLessThanOrEqual(24);
  });

  /* Tile size is now structural rather than a property of the photos, so this
     holds in the placeholder state too — it no longer needs WordPress. */
  test('desktop tiles vary in both width and height', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/fotografo');
    const metrics = await page.evaluate(mosaicMetrics);

    expect(metrics).not.toBeNull();
    expect(metrics!.cells.length, 'Mosaic rendered no tiles').toBeGreaterThanOrEqual(11);

    const widths = new Set(metrics!.cells.map((c) => c.w));
    const heights = new Set(metrics!.cells.map((c) => c.h));

    expect(
      widths.size,
      `All ${metrics!.cells.length} tiles share one width — wide/big spans are not applying`
    ).toBeGreaterThan(1);
    expect(
      heights.size,
      `All ${metrics!.cells.length} tiles share one height — tall/big spans are not applying`
    ).toBeGreaterThan(1);
  });

  test('portrait suppresses full-width tiles', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto('/fotografo');
    const metrics = await page.evaluate(mosaicMetrics);

    expect(metrics).not.toBeNull();
    const fullWidth = metrics!.cells.filter((c) => c.w > metrics!.width * 0.9);
    expect(
      fullWidth.length,
      `${fullWidth.length} tile(s) span the full width in portrait — 2-column spans should be off below 640px`
    ).toBe(0);
  });
});
