// Convert hex color to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, "")

  // Parse hex values
  const bigint = Number.parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

// Convert HSL color to RGB
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  // Must be fractions of 1
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

// Parse HSL string like "217 91% 60%" to RGB
export function parseHslToRgb(hslStr: string): { r: number; g: number; b: number } | null {
  const match = hslStr.match(/(\d+)\s+(\d+)%\s+(\d+)%/)
  if (!match) return null

  const h = Number.parseInt(match[1], 10)
  const s = Number.parseInt(match[2], 10)
  const l = Number.parseInt(match[3], 10)

  return hslToRgb(h, s, l)
}

// Calculate relative luminance for RGB values
export function calculateLuminance(rgb: { r: number; g: number; b: number }): number {
  const { r, g, b } = rgb
  const rsrgb = r / 255
  const gsrgb = g / 255
  const bsrgb = b / 255

  const r1 = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4)
  const g1 = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4)
  const b1 = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4)

  return 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1
}

// Calculate contrast ratio between two colors
export function calculateContrastRatio(color1: string, color2: string): number {
  let rgb1, rgb2

  // Check if colors are in hex or HSL format
  if (color1.startsWith("#")) {
    rgb1 = hexToRgb(color1)
  } else {
    rgb1 = parseHslToRgb(color1)
  }

  if (color2.startsWith("#")) {
    rgb2 = hexToRgb(color2)
  } else {
    rgb2 = parseHslToRgb(color2)
  }

  if (!rgb1 || !rgb2) return 0

  const luminance1 = calculateLuminance(rgb1)
  const luminance2 = calculateLuminance(rgb2)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

// Check if contrast meets WCAG standards
export function checkContrast(
  contrastRatio: number,
  level: "AA" | "AAA" = "AA",
  size: "normal" | "large" = "normal",
): boolean {
  if (level === "AA") {
    return size === "normal" ? contrastRatio >= 4.5 : contrastRatio >= 3
  } else {
    return size === "normal" ? contrastRatio >= 7 : contrastRatio >= 4.5
  }
}

// Get contrast level description
export function getContrastLevel(contrastRatio: number): {
  aa: { normal: boolean; large: boolean }
  aaa: { normal: boolean; large: boolean }
} {
  return {
    aa: {
      normal: contrastRatio >= 4.5,
      large: contrastRatio >= 3,
    },
    aaa: {
      normal: contrastRatio >= 7,
      large: contrastRatio >= 4.5,
    },
  }
}

// Suggest improved color for better contrast
export function suggestImprovedColor(baseColor: string, contrastColor: string, targetRatio = 4.5): string {
  // This is a simplified approach - in a real implementation, you might want a more sophisticated algorithm
  const rgb = baseColor.startsWith("#") ? hexToRgb(baseColor) : parseHslToRgb(baseColor)
  if (!rgb) return baseColor

  // Try to adjust lightness to improve contrast
  const currentRatio = calculateContrastRatio(baseColor, contrastColor)

  if (currentRatio >= targetRatio) return baseColor

  // Determine if we need to lighten or darken
  const baseLuminance = calculateLuminance(rgb)
  const contrastRgb = contrastColor.startsWith("#") ? hexToRgb(contrastColor) : parseHslToRgb(contrastColor)
  if (!contrastRgb) return baseColor

  const contrastLuminance = calculateLuminance(contrastRgb)

  // If base is darker than contrast, lighten it; otherwise, darken it
  const shouldLighten = baseLuminance < contrastLuminance

  // Convert RGB to hex for return
  const componentToHex = (c: number) => {
    const hex = Math.max(0, Math.min(255, c)).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
  }

  // Adjust color until we reach target contrast or hit limits
  const adjustedRgb = { ...rgb }
  let adjustedRatio = currentRatio
  let iterations = 0
  const maxIterations = 20 // Prevent infinite loops

  while (adjustedRatio < targetRatio && iterations < maxIterations) {
    iterations++

    if (shouldLighten) {
      adjustedRgb.r = Math.min(255, adjustedRgb.r + 10)
      adjustedRgb.g = Math.min(255, adjustedRgb.g + 10)
      adjustedRgb.b = Math.min(255, adjustedRgb.b + 10)
    } else {
      adjustedRgb.r = Math.max(0, adjustedRgb.r - 10)
      adjustedRgb.g = Math.max(0, adjustedRgb.g - 10)
      adjustedRgb.b = Math.max(0, adjustedRgb.b - 10)
    }

    const adjustedColor = rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b)
    adjustedRatio = calculateContrastRatio(adjustedColor, contrastColor)

    // If we've hit the limits of RGB values and still haven't reached target
    if (
      (shouldLighten && adjustedRgb.r === 255 && adjustedRgb.g === 255 && adjustedRgb.b === 255) ||
      (!shouldLighten && adjustedRgb.r === 0 && adjustedRgb.g === 0 && adjustedRgb.b === 0)
    ) {
      break
    }
  }

  return rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b)
}
