# Media, performance and acceptance

Inventory supplied media recursively and hash contents for byte-identical duplicates; deduplicate only the display inventory, never delete/rename originals. Map derivatives to exact products/events. Generate responsive variants, dimensions and video posters. Remove private filenames, local paths and location metadata from published derivatives. Confirm rights; never invent product photos.

Use `srcset`/`sizes`, hero priority only for the true LCP image, and lazy loading below the fold. Avoid preloading whole galleries. Use system fonts or licensed self-hosted fonts. Videos have posters, deferred sources, native controls and original aspect ratio, with no autoplay. Verify extracted poster frames.

## Photo previews

Gallery clicks open an in-page dialog containing an image. They never navigate to raw files or use `download`, which can trigger attachment pages on some hosts. Product-card links lead to product details; enlargement is separate. Provide close, previous/next, counter and descriptive labels; support Escape/arrows, modal focus containment, focus return and mobile viewport limits. Full images use `contain`. Only an explicitly labeled download action saves a file.

## Relevant checks

- Home/category/catalog/details on desktop/mobile, long names/tables, direct production route reload and locale persistence.
- Consistent numeric order including fractional/unordered names; aliases/model results against approved sources; explicit no-match state.
- Gallery first/middle/last image, keyboard/touch, focus return, whole image visible, failed-image state. Assert clicks cause neither navigation nor download. Verify video aspect and deferred loading.
- All languages including errors, metadata, contact dialog and empty states; approved contact destinations only.
- Real backend: unauthenticated/non-owner rejection; no private fields in public responses/source/bundles/errors; inquiry retries, duplicate imports, stale edits, failed saves and archive restore using isolated fixtures.
- Actual build/type/lint checks and relevant tests. Static starter has no build step; serve through HTTP for browser verification.

Measure private customer saves with browser waterfall and redacted server timing, same dataset/region/connection before and after. Don't infer CRM speed from homepage scores. PageSpeed/Lighthouse are lab observations, not promises; record URL/date/device/conditions. Inspect LCP, CLS, TTFB, bytes/waterfall and INP when field data exists. New sites may lack field data. Don't submit private authenticated/customer-filled URLs to public testing services.

Release record: revision, build outcome, migration result, deployment URL, smoke test and rollback option. Keep credentials/dumps outside artifacts. Distinguish generated prototype from published application; no existing domains, deployment IDs or credentials belong in a reusable starter.
