# Product Images Directory

This directory contains images for coffee bean products sold in the shop.

## Folder Structure

- **`featured/`** - Featured or promotional product images
- **`single-origin/`** - Single-origin coffee bean images
- **`blends/`** - Coffee blend images
- **`decaf/`** - Decaffeinated coffee images
- **`flavored/`** - Flavored coffee images

## Naming Convention

For consistency, name your product images using one of these formats:

1. **By product name** (recommended):
   - `ethiopia-yirgacheffe.jpg`
   - `colombia-huila.jpg`
   - `house-blend.jpg`

2. **By product ID** (if you have IDs):
   - `product-{id}.jpg`
   - Example: `product-507f1f77bcf86cd799439011.jpg`

3. **Multiple images per product**:
   - `ethiopia-yirgacheffe-1.jpg` (main image)
   - `ethiopia-yirgacheffe-2.jpg` (detail/alternative view)
   - `ethiopia-yirgacheffe-3.jpg` (packaging shot)

## Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Recommended size**: 800x800px to 1200x1200px (square aspect ratio works best)
- **File size**: Keep under 500KB per image for web performance
- **Quality**: High quality, well-lit product photos

## Usage in Database

When adding images to products in your database (via seed script or admin), reference them like this:

```javascript
images: [
  "/images/products/single-origin/ethiopia-yirgacheffe.jpg",
  "/images/products/single-origin/ethiopia-yirgacheffe-2.jpg"
]
```

The first image in the array will be used as the main product image in the shop.

## Quick Setup

1. Add your product images to the appropriate category folder
2. Update your seed script (`server/seed.js`) to include image paths in the `images` array for each product
3. Run `npm run seed` in the `server/` directory to update products with images

