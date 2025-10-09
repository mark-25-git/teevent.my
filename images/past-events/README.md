# Past Events Images

This directory contains images of products from past events that Teevent has completed.

## How to Add New Past Event Images

1. **Create the directory structure:**
   ```
   images/past-events/
   ├── placeholder-1.webp
   ├── placeholder-2.webp
   ├── placeholder-3.webp
   ├── placeholder-4.webp
   ├── placeholder-5.webp
   ├── placeholder-6.webp
   └── README.md (this file)
   ```

2. **Image Requirements:**
   - **Format:** WebP (preferred) or JPG
   - **Dimensions:** 400x300px minimum (aspect ratio 4:3)
   - **File size:** Keep under 200KB for fast loading
   - **Quality:** High quality, well-lit product photos

3. **Naming Convention:**
   - Use descriptive names like: `university-tshirt-2024.webp`
   - Or keep the placeholder naming: `placeholder-1.webp`, `placeholder-2.webp`, etc.

4. **Content Guidelines:**
   - Show the actual product clearly
   - Good lighting and clean background
   - Avoid showing people's faces unless you have permission
   - Focus on the product quality and design

5. **Update the HTML:**
   - Replace the `src` attributes in `index.html` with your actual image paths
   - Update the `alt` text to be descriptive
   - Update the event titles and product types in the modal

## Current Placeholder Structure

The modal is set up with 6 placeholder slots:
- placeholder-1.webp → Custom T-Shirts
- placeholder-2.webp → Custom Lanyards  
- placeholder-3.webp → Custom Canvas Bags
- placeholder-4.webp → Custom Keychains
- placeholder-5.webp → Custom T-Shirts
- placeholder-6.webp → Custom Lanyards

## Adding More Items

To add more past event items:
1. Add new `.past-event-item` divs in the HTML
2. Follow the same structure as existing items
3. Update the CSS grid if you want different layouts
4. Consider pagination if you have many items

## Legal Considerations

- Ensure you have permission to use these images
- Respect client confidentiality
- Consider adding watermarks if needed
- Get written permission from clients before featuring their products

