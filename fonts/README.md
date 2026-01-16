# Fonts Directory

## Challista Script Font Setup

The "Dear Lilian" heading is configured to use the **Challista Script Font**. 

### Current Implementation
The font is loaded via **CDNFonts** CDN in the CSS file:
```css
@import url('https://fonts.cdnfonts.com/css/challista');
```

### Fallback Fonts
- **Great Vibes** from Google Fonts is used as a fallback (similar elegant script style)
- Additional fallbacks: 'Brush Script MT', 'Lucida Handwriting', cursive

### Alternative: Self-Hosted Font Files

If you prefer to self-host the Challista font instead of using the CDN:

1. **Download the Challista font** from a reputable source:
   - **Recommended**: CDNFonts: https://www.cdnfonts.com/challista.font
   - Alternative: DaFont: https://www.dafont.com/challista.font
   - Alternative: FontBundles: https://fontbundles.net/free-fonts/script-fonts/challista-script
   
   **Important**: Always verify the license file included in the download package to ensure it permits your intended use. The Challista font is typically free for personal use; commercial use may require a license.

2. **Convert the font** (if needed) to web formats using:
   - Font Squirrel Webfont Generator: https://www.fontsquirrel.com/tools/webfont-generator
   - Or use an online TTF to WOFF/WOFF2 converter

3. **Place the font files** in this directory with these names:
   - `challista-regular.woff2` (recommended, best compression)
   - `challista-regular.woff` (good browser support)
   - `challista-regular.ttf` (fallback for older browsers)

4. **Update the CSS** in `css/styles.css` to replace the CDN import with @font-face:
   ```css
   @font-face {
     font-family: 'Challista';
     src: url('../fonts/challista-regular.woff2') format('woff2'),
          url('../fonts/challista-regular.woff') format('woff'),
          url('../fonts/challista-regular.ttf') format('truetype');
     font-weight: normal;
     font-style: normal;
     font-display: swap;
   }
   ```

5. **Remove the CDN import** line from the CSS once self-hosted files are in place.

### About Challista
Challista is a modern calligraphy script font with:
- Elegant handwritten style
- Decorative characters and swashes
- Perfect for invitations, branding, and creative projects

### License
The Challista font is generally offered as free for personal use. **For commercial use, verify the specific license** from your source. Some distributors may require a commercial license purchase.

### File Structure (if self-hosting)
```
fonts/
├── README.md (this file)
├── challista-regular.woff2 (optional - add for self-hosting)
├── challista-regular.woff (optional - add for self-hosting)
└── challista-regular.ttf (optional - add for self-hosting)
```
