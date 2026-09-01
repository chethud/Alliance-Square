const SHORT_ASPECT = 9 / 16;

export function getShortEmbedSize(height?: number, maxWidth?: number) {
  if (!height || height <= 0) {
    return { height: 420, width: 315, scale: 1.35 };
  }

  const naturalWidth = height * SHORT_ASPECT;
  const width =
    maxWidth && maxWidth > naturalWidth
      ? Math.round(maxWidth)
      : Math.round(naturalWidth * 1.12);

  const scale = Math.max(width / naturalWidth, 1.25);

  return { height, width, scale };
}
