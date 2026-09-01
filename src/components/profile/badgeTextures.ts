// Clean blank lanyard strap texture (no text, no icons)
export function generateLanyardStrapDataUrl(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Matte dark slate / pure clean strap
  ctx.fillStyle = '#141517';
  ctx.fillRect(0, 0, 512, 128);

  // Subtle refined edge seam lines (no text or glyphs)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 14);
  ctx.lineTo(512, 14);
  ctx.moveTo(0, 114);
  ctx.lineTo(512, 114);
  ctx.stroke();

  return canvas.toDataURL('image/png');
}
