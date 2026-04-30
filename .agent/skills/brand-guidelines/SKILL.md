---
name: pride-brand-guidelines
description: Visual and tonal guidelines for the Pride Selfcare project.
---

# Pride Selfcare Brand Guidelines

## 1. Visual Identity
The Pride Selfcare brand is built on inclusivity, empathy, and safety. The visual language uses soft gradients and a pastel-ized version of the Pride spectrum to create a calming, supportive environment.

### 1.1 Color Palette
Use these CSS variables for consistency:
- **Pride Spectrum (Backgrounds)**: `--bg-pride-1` through `--bg-pride-6`. Use in 135-degree linear gradients.
- **Accent Pastels**:
  - Lavender: `var(--lavender)`
  - Pink: `var(--pink)`
  - Blue: `var(--blue)`
  - Peach: `var(--peach)`
  - Mint: `var(--mint)`
- **Core UI**:
  - Background: `var(--background)` (#fcfaf7)
  - Foreground: `var(--foreground)` (#3b3a40)
  - Primary: `var(--primary)` (Deep Lavender)

### 1.2 Typography
- **Primary Font**: 'Instrument Sans', sans-serif.
- **Style**: Modern, clean, and highly legible. Use `antialiased` for smooth rendering.

### 1.3 Design Elements
- **Corner Radius**: Standardized at `1rem` (rounded-2xl in Tailwind).
- **Shadows**: Use `--shadow-soft` for subtle depth and `--shadow-card` for interactive elements.
- **Gradients**: Backgrounds should always use the 6-color pride gradient defined in `index.css`.

## 2. Voice and Tone
- **Empathetic**: Acknowledge the user's feelings without judgment.
- **Inclusive**: Use gender-neutral language and respect all identities within the LGBTQ+ spectrum.
- **Empowering**: Focus on self-care, growth, and resilience.
- **Safe**: Maintain a calm and professional demeanor to build trust.

## 3. Implementation Logic
When generating UI or content:
1.  **Always** apply the `Instrument Sans` font.
2.  **Avoid** harsh colors (pure black/red/green). Use the pastel palette.
3.  **Ensure** all interactive containers have the standard `1rem` border radius.
4.  **Use** the pride gradient for page-level backgrounds.
