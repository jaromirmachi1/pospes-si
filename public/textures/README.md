# Optional texture assets

Drop these files here for a richer look. The site works without them (CSS fallbacks are used).

- **noise.png** – Monochrome film grain, ~512×512 or 1024×1024, low contrast.  
  Used as `.noise-layer` in `src/index.css` if you switch the overlay to use it.

- **paper.jpg** – Subtle paper/poster texture, desaturated.  
  Used as `.paper-layer` in `src/index.css` if you switch the overlay to use it.

To use real textures, add the classes `noise-layer` and `paper-layer` to the overlay divs in `NoiseOverlay.tsx` and keep the fallbacks as backup for missing files.
