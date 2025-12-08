# Images Directory Structure

This directory contains all images used throughout the Wild Bean Coffee website, organized by component/usage type.

## Folder Structure

- **`logo/`** - Brand logos and logo variations
  - Main logo: `logo.png` (or `logo.svg`)
  - Favicon: `favicon.ico` (can also be in root `/public`)
  - Logo variations for different contexts

- **`products/`** - Coffee bean product images
  - Individual product photos
  - Product detail images
  - Naming convention: `product-{id}.jpg` or descriptive names

- **`menu/`** - Menu item images
  - Beverage photos
  - Food item photos
  - Menu section headers

- **`hero/`** - Hero section and banner images
  - Homepage hero images
  - Section background images
  - Large format promotional images

- **`icons/`** - Icon files (if not using an icon library)
  - Custom icons
  - Decorative elements

## Usage

All images in this directory are accessible via the `/images/` path in your Next.js app.

Example:
```jsx
<Image src="/images/logo/logo.png" alt="Wild Bean Coffee" />
```

## Image Guidelines

- Use optimized formats (WebP, AVIF when possible)
- Maintain consistent aspect ratios for similar content types
- Keep file sizes reasonable for web performance
- Use descriptive filenames

