import { test, expect, type Page } from '@playwright/test';

// Minimum acceptable resolution for a professional portfolio intro video.
// 720p (1280×720) landscape / 720p rotated (720×1280) portrait.
const MIN = {
  landscape: { width: 1280, height: 720 },
  portrait:  { width: 720,  height: 1280 },
};

async function getVideoResolution(page: Page, src: string) {
  return page.evaluate((videoSrc: string) => {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      const source = document.querySelector(`video source[src="${videoSrc}"]`);
      const video = source?.closest('video') as HTMLVideoElement | null;

      if (!video) {
        reject(new Error(`No <video> element found for src="${videoSrc}"`));
        return;
      }

      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        resolve({ width: video.videoWidth, height: video.videoHeight });
        return;
      }

      video.addEventListener(
        'loadedmetadata',
        () => resolve({ width: video.videoWidth, height: video.videoHeight }),
        { once: true },
      );

      // Trigger load in case the browser deferred it (e.g. display:none).
      video.load();

      setTimeout(
        () => reject(new Error(`Timed out waiting for metadata: ${videoSrc}`)),
        10_000,
      );
    });
  }, src);
}

test('landscape intro video is not pixelated (≥ 1280×720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  const { width, height } = await getVideoResolution(page, '/intro-landscape.mp4');

  expect(
    width,
    `Landscape video width is ${width}px — must be ≥ ${MIN.landscape.width}px`,
  ).toBeGreaterThanOrEqual(MIN.landscape.width);

  expect(
    height,
    `Landscape video height is ${height}px — must be ≥ ${MIN.landscape.height}px`,
  ).toBeGreaterThanOrEqual(MIN.landscape.height);
});

test('portrait intro video is not pixelated (≥ 720×1280)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const { width, height } = await getVideoResolution(page, '/intro-portrait.mp4');

  expect(
    width,
    `Portrait video width is ${width}px — must be ≥ ${MIN.portrait.width}px`,
  ).toBeGreaterThanOrEqual(MIN.portrait.width);

  expect(
    height,
    `Portrait video height is ${height}px — must be ≥ ${MIN.portrait.height}px`,
  ).toBeGreaterThanOrEqual(MIN.portrait.height);
});
