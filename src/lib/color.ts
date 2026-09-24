/** Relative luminance of a #rrggbb colour (WCAG). */
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Near-black or near-white, whichever reads better on the given background. */
export function textOn(hex: string) {
  const l = luminance(hex)
  const onDark = (1.05 / (l + 0.05))
  const onLight = (l + 0.05) / (luminance('#141412') + 0.05)
  return onDark >= onLight ? '#f7f5f0' : '#141412'
}
