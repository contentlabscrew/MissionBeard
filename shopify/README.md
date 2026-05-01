# Build Your Bundle — Shopify implementation

A conversion-optimised PDP for Mission Beard's build-your-own beard oil bundle, implemented as a drop-in Shopify section + page template.

Built from the design handoff in `Build Your Bundle.html`. Faithful to the design's dark/orange brand language, tier ladder, scent picker, fragrance cards, video carousel, UGC grid, reviews, ingredients, FAQ, guarantee, sticky ATC.

## What's here

```
shopify/
├── README.md                                      this file
├── assets/
│   ├── build-your-bundle.css.liquid              all styles (Liquid-processed for asset URLs)
│   ├── build-your-bundle.js                       bundle builder + interactions
│   ├── byb-*.jpg / .png                           images (prefixed to avoid theme collisions)
│   └── byb-*.ttf                                  brand fonts
├── layout/
│   └── page-blank.liquid                          minimal layout (no theme header/footer)
├── sections/
│   └── build-your-bundle.liquid                   the page section
└── templates/
    └── page.build-your-bundle.json                page template that uses the section
```

## Install

1. **Upload the files** to your live theme via Shopify admin → **Online Store → Themes → … → Edit code**, matching the directory structure above (`assets/`, `layout/`, `sections/`, `templates/`). For most stores it's faster via Shopify CLI:

   ```bash
   cd shopify
   shopify theme push --only \
     assets/build-your-bundle.css.liquid \
     assets/build-your-bundle.js \
     assets/byb-*.jpg \
     assets/byb-*.png \
     assets/byb-*.ttf \
     layout/page-blank.liquid \
     sections/build-your-bundle.liquid \
     templates/page.build-your-bundle.json
   ```

2. **Create the page** in Shopify admin → **Online Store → Pages → Add page**.
   - Title: `Build Your Bundle` (slug becomes `/pages/build-your-bundle`)
   - Theme template: select **build-your-bundle**
   - Save.

3. **Wire up the variant IDs** so Add-to-Cart works.
   - Edit the page in **Theme editor** (Customize) → **Build Your Bundle** section.
   - Paste each scent's Shopify **variant ID** (not product ID) into the four fields:
     - Underdog
     - True North
     - El Presidente
     - Sandalwood Vanille
   - Find variant IDs under Products → variant → check the URL (`…/variants/<id>`).

4. (Optional) **Toggle the built-in header/footer** in section settings if your theme already renders global chrome. Default is on, with `layout: page-blank` so they don't double-stack.

5. **Adjust pricing**: section settings → Single bottle RRP. Tier discounts (10/15/25%) are computed from this.

## Pricing logic

| Bundle | Discount | Example @ £24 |
|---|---|---|
| 1 bottle | — | £24.00 |
| 2 bottles | 10% off | £43.20 (save £4.80) |
| 3 bottles | 15% off | £61.20 (save £10.80) — **Most popular** |
| 4 bottles | 25% off | £72.00 (save £24.00) — **1 free** |

Prices in the UI are computed client-side from the single price + tier discount, so the displayed total stays in sync as the user changes their bundle. The actual cart line items use the variant-level prices Shopify already knows about.

> **Note:** the discount itself isn't applied automatically by Shopify — to honor the bundle pricing at checkout, set up a **Buy X Get Y** automatic discount (or use Shopify Functions / Shopify Bundles app) targeting these variants with the matching qty thresholds. The section adds a `_bundle_size` line-item property that you can use as a discount condition.

## Customising content

Scent copy, reviews, FAQs and UGC handles are baked into `sections/build-your-bundle.liquid` (copied from the design's `data.js`). Edit that file directly if marketing wants different wording. If you want everything to be theme-editor-configurable instead, the next step would be to refactor each piece into section blocks — open an issue and I'll do it.

## Browser support

- Modern Chrome / Safari / Firefox / Edge (last 2 versions)
- Uses `IntersectionObserver`, `aspect-ratio`, `clamp()`, `text-wrap: balance` — all widely supported
- Mobile responsive: hero stacks under 1080px, video cards shrink under 800px, tier ladder reflows under 540px
