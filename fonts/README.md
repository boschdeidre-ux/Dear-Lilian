# Fonts Directory

## Olivia Calligraphy Typeface Setup

The "Dear Lilian" heading is configured to use the **Olivia Calligraphy Typeface**. 

### Current Status
Currently using **Alex Brush** from Google Fonts as a fallback (similar elegant script style).

### To Use the Actual Olivia Font

1. **Download the Olivia font** from a reputable source:
   - 1001 Fonts: https://www.1001fonts.com/olivia-font.html
   - Dafont: https://www.dafont.com/olivia-3.font
   - Font Squirrel: https://www.fontsquirrel.com/fonts/olivia

2. **Convert the font** (if needed) to web formats using:
   - Font Squirrel Webfont Generator: https://www.fontsquirrel.com/tools/webfont-generator
   - Or use an online TTF to WOFF/WOFF2 converter

3. **Place the font files** in this directory with these exact names:
   - `olivia-regular.woff2` (recommended, best compression)
   - `olivia-regular.woff` (good browser support)
   - `olivia-regular.ttf` (fallback for older browsers)

4. **Verify the CSS** is already configured in `css/styles.css` with the @font-face declaration pointing to these files.

5. **Remove the Google Fonts import** for Alex Brush from the CSS once Olivia is in place (optional).

### License
The Olivia font is free for personal and commercial use according to the license provided by the font creator. Always verify the license in the downloaded font package.

### File Structure
```
fonts/
├── README.md (this file)
├── olivia-regular.woff2 (add this)
├── olivia-regular.woff (add this)
└── olivia-regular.ttf (add this)
```
