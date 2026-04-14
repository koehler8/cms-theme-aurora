# @koehler8/cms-theme-aurora — Aurora Drift

- **Slug**: `aurora`
- **Version**: 1.0.1
- **Author**: koehler8

## Install

```bash
npm install @koehler8/cms-theme-aurora
```

```js
// vite.config.js
import cms from '@koehler8/cms/vite';

export default {
  plugins: cms({ siteDir: './site', themes: ['@koehler8/cms-theme-aurora'] }),
};
```

Set `site.theme` to `"aurora"` in your site config. Removing the value falls back to the Core Base palette.

If your deployment blocks Google Fonts, self-host the `Space Grotesk` family or swap the import in `theme.css`.

## Visual Direction

- Dark sci-fi gradients with electric blue/purple primary hues, orange highlights, and glassy cards.
- Body and hero canvases layer multiple radial gradients; containers clamp to `min(1180px, 92vw)` for tighter marketing layouts.
- Cards pick up a violet border/glow and uppercase CTAs; heading typography swaps to Space Grotesk.

## Token Highlights

- Primary CTA: multi-stop gradient (blue → purple → orange) with strong glow; secondary CTA keeps a dark, velvety surface.
- Surfaces include overlay/backdrop tokens for modals plus helper/tab/field treatments tuned for dark backgrounds.
- Status headline + chart tokens lean on the same electric palette so KPI tiles stay legible against the deep canvas.

## Compatibility Notes

- Optimized for dark hero art and neon iconography; avoid pairing with extremely light site imagery unless you override section backgrounds.
- The theme ships only CSS/manifest — no extra JS. Structured tokens follow the standard theme schema so extension components inherit colors automatically.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

[MIT](./LICENSE)
