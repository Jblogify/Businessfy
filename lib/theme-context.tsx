"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

type ColorTheme = {
  name: string
  id: string
  industry?: string
  description?: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

// General themes
const generalThemes: ColorTheme[] = [
  {
    name: "Business Blue",
    id: "blue",
    description: "Professional and trustworthy, suitable for most businesses",
    colors: {
      primary: "217 91% 60%",
      secondary: "172 66% 50%",
      accent: "172 66% 50%",
    },
  },
  {
    name: "Forest Green",
    id: "green",
    description: "Fresh and natural, ideal for eco-friendly or outdoor businesses",
    colors: {
      primary: "142 76% 36%",
      secondary: "120 100% 93%",
      accent: "142 71% 45%",
    },
  },
  {
    name: "Royal Purple",
    id: "purple",
    description: "Luxurious and creative, perfect for premium or artistic brands",
    colors: {
      primary: "262 83% 58%",
      secondary: "262 100% 96%",
      accent: "262 83% 58%",
    },
  },
  {
    name: "Sunset Orange",
    id: "orange",
    description: "Energetic and friendly, great for food or entertainment businesses",
    colors: {
      primary: "24 95% 53%",
      secondary: "24 100% 93%",
      accent: "24 95% 53%",
    },
  },
  {
    name: "Ruby Red",
    id: "red",
    description: "Bold and passionate, suitable for brands that want to stand out",
    colors: {
      primary: "0 84% 60%",
      secondary: "0 100% 96%",
      accent: "0 84% 60%",
    },
  },
]

// Finance industry themes
const financeThemes: ColorTheme[] = [
  {
    name: "Banking Blue",
    id: "finance-blue",
    industry: "Finance",
    description: "Trustworthy and secure, ideal for banking and financial services",
    colors: {
      primary: "221 83% 53%",
      secondary: "220 14% 96%",
      accent: "221 83% 53%",
    },
  },
  {
    name: "Investment Green",
    id: "finance-green",
    industry: "Finance",
    description: "Symbolizes growth and prosperity, perfect for investment firms",
    colors: {
      primary: "150 84% 39%",
      secondary: "150 100% 96%",
      accent: "150 84% 39%",
    },
  },
  {
    name: "Corporate Gray",
    id: "finance-gray",
    industry: "Finance",
    description: "Professional and conservative, suitable for traditional financial institutions",
    colors: {
      primary: "220 14% 40%",
      secondary: "220 14% 96%",
      accent: "220 14% 40%",
    },
  },
]

// Healthcare industry themes
const healthcareThemes: ColorTheme[] = [
  {
    name: "Medical Blue",
    id: "healthcare-blue",
    industry: "Healthcare",
    description: "Clean and calming, widely used in healthcare and medical services",
    colors: {
      primary: "199 89% 48%",
      secondary: "199 100% 96%",
      accent: "199 89% 48%",
    },
  },
  {
    name: "Wellness Green",
    id: "healthcare-green",
    industry: "Healthcare",
    description: "Fresh and natural, ideal for holistic health and wellness services",
    colors: {
      primary: "158 64% 52%",
      secondary: "158 100% 96%",
      accent: "158 64% 52%",
    },
  },
  {
    name: "Pharmacy Teal",
    id: "healthcare-teal",
    industry: "Healthcare",
    description: "Professional yet approachable, perfect for pharmacies and medical practices",
    colors: {
      primary: "174 100% 29%",
      secondary: "174 100% 96%",
      accent: "174 100% 29%",
    },
  },
]

// Technology industry themes
const techThemes: ColorTheme[] = [
  {
    name: "Tech Blue",
    id: "tech-blue",
    industry: "Technology",
    description: "Modern and innovative, popular among tech companies and startups",
    colors: {
      primary: "213 94% 68%",
      secondary: "213 100% 96%",
      accent: "213 94% 68%",
    },
  },
  {
    name: "Digital Purple",
    id: "tech-purple",
    industry: "Technology",
    description: "Creative and forward-thinking, ideal for digital agencies and software companies",
    colors: {
      primary: "265 89% 66%",
      secondary: "265 100% 97%",
      accent: "265 89% 66%",
    },
  },
  {
    name: "Cyber Green",
    id: "tech-green",
    industry: "Technology",
    description: "Futuristic and secure, suitable for cybersecurity and blockchain businesses",
    colors: {
      primary: "142 71% 45%",
      secondary: "142 100% 96%",
      accent: "142 71% 45%",
    },
  },
]

// Education industry themes
const educationThemes: ColorTheme[] = [
  {
    name: "Academic Blue",
    id: "education-blue",
    industry: "Education",
    description: "Traditional and trustworthy, common in educational institutions",
    colors: {
      primary: "210 100% 56%",
      secondary: "210 100% 97%",
      accent: "210 100% 56%",
    },
  },
  {
    name: "Learning Green",
    id: "education-green",
    industry: "Education",
    description: "Fresh and encouraging, ideal for K-12 schools and learning platforms",
    colors: {
      primary: "168 75% 41%",
      secondary: "168 100% 96%",
      accent: "168 75% 41%",
    },
  },
  {
    name: "Knowledge Red",
    id: "education-red",
    industry: "Education",
    description: "Bold and energetic, great for educational technology and online learning",
    colors: {
      primary: "354 70% 54%",
      secondary: "354 100% 97%",
      accent: "354 70% 54%",
    },
  },
]

// Retail & E-commerce industry themes
const retailThemes: ColorTheme[] = [
  {
    name: "Retail Red",
    id: "retail-red",
    industry: "Retail",
    description: "Bold and attention-grabbing, effective for sales and promotions",
    colors: {
      primary: "0 91% 71%",
      secondary: "0 100% 97%",
      accent: "0 91% 71%",
    },
  },
  {
    name: "Shopping Green",
    id: "retail-green",
    industry: "Retail",
    description: "Fresh and economical, good for marketplaces and sustainable brands",
    colors: {
      primary: "152 69% 31%",
      secondary: "152 100% 96%",
      accent: "152 69% 31%",
    },
  },
  {
    name: "E-commerce Blue",
    id: "retail-blue",
    industry: "Retail",
    description: "Trustworthy and secure, ideal for online stores and e-commerce platforms",
    colors: {
      primary: "224 76% 48%",
      secondary: "224 100% 97%",
      accent: "224 76% 48%",
    },
  },
]

// Combine all themes
const colorThemes: ColorTheme[] = [
  ...generalThemes,
  ...financeThemes,
  ...healthcareThemes,
  ...techThemes,
  ...educationThemes,
  ...retailThemes,
]

// Group themes by industry for easier access
const themesByIndustry = {
  General: generalThemes,
  Finance: financeThemes,
  Healthcare: healthcareThemes,
  Technology: techThemes,
  Education: educationThemes,
  Retail: retailThemes,
}

type ThemeContextType = {
  colorTheme: string
  setColorTheme: (theme: string) => void
  availableThemes: ColorTheme[]
  themesByIndustry: Record<string, ColorTheme[]>
  applyTheme: (themeId: string) => void
  previewTheme: (themeId: string) => void
  getThemeById: (themeId: string) => ColorTheme | undefined
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [colorTheme, setColorTheme] = useState<string>("blue")

  // Apply theme on initial load and when theme changes
  useEffect(() => {
    const savedTheme = localStorage.getItem("businessfy-color-theme") || "blue"
    setColorTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  // Get theme by ID
  const getThemeById = (themeId: string) => {
    return colorThemes.find((theme) => theme.id === themeId)
  }

  // Apply theme function
  const applyTheme = (themeId: string) => {
    const selectedTheme = getThemeById(themeId)

    if (!selectedTheme) return

    // Update CSS variables
    document.documentElement.style.setProperty("--primary", selectedTheme.colors.primary)
    document.documentElement.style.setProperty("--secondary", selectedTheme.colors.secondary)
    document.documentElement.style.setProperty("--accent", selectedTheme.colors.accent)

    // Save to localStorage
    localStorage.setItem("businessfy-color-theme", themeId)
    setColorTheme(themeId)
  }

  // Preview theme function
  const previewTheme = (themeId: string) => {
    const selectedTheme = getThemeById(themeId)

    if (!selectedTheme) return

    // Update CSS variables temporarily
    document.documentElement.style.setProperty("--primary", selectedTheme.colors.primary)
    document.documentElement.style.setProperty("--secondary", selectedTheme.colors.secondary)
    document.documentElement.style.setProperty("--accent", selectedTheme.colors.accent)
  }

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        availableThemes: colorThemes,
        themesByIndustry,
        applyTheme,
        previewTheme,
        getThemeById,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useColorTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ThemeProvider")
  }
  return context
}
