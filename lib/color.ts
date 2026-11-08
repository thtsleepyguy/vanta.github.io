/**
 * Converts an OKLCH triplet to a hex string for the WebGL material.
 * The DOM never uses this: CSS tokens remain the single source for styling.
 */
export function oklchToHex([l, c, h]: [number, number, number]): string {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const linR = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const linG = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const linB = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  const gamma = (value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    return clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  const channel = (value: number) =>
    Math.round(gamma(value) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${channel(linR)}${channel(linG)}${channel(linB)}`;
}
