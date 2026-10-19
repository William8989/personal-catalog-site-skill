---
name: personal-catalog-site-builder
description: Build or improve person-led B2B websites with product catalogs, model tables, in-page photo previews, multilingual content, inquiry flows, and an owner-only customer workspace. Use for export, supplier, consultant or distributor websites that introduce a person before products. Includes a neutral static starter and guides for implementing a real backend; no specific host required.
---

# Personal Catalog Site Builder

Deliver a working site, proportionate verification and an accurate deployment status. Reuse the architecture and engineering approach, never another site's business data.

## Start with the project

Read local instructions, existing source and relevant notes. Preserve product IDs, records, original media and established behavior when updating a site. Identify audience, languages, categories, verified introduction, approved contacts, media locations and host/auth capabilities. Ask only for omissions that change the result; continue independent work. Never invent employment, certifications, factory ownership, capacity, delivery guarantees, testimonials or specifications.

Determine scope: public showcase, catalog, inquiry intake, private CRM, or all four. A browser-only mockup is not a private CRM. Reuse the project's framework/host. Without a stack preference, the bundled static starter is a public prototype; choose a server and persistent database for production data. If Sites is installed and chosen, follow its installed skill rather than guessing deployment APIs.

## Scaffold a new public prototype

With Python 3.10+:

```sh
python <skill-directory>/scripts/scaffold_site.py --output <new-project-directory>
python -m http.server 8000 --directory <new-project-directory>
```

Destination must not exist. The script copies only the bundled template, never searches for private files. Edit `site-data.json` with confirmed content. All bundled graphics/products/specifications are synthetic. The starter supports English/Spanish examples, responsive cards, shareable query-based detail views, searchable/paginated models and keyboard-accessible photo previews. It includes no authentication, stored inquiries, CRM or production `/products/{id}` router. Implement those before claiming delivery and remove samples before launch.

## Build the public experience

Read [layout-and-content.md](references/layout-and-content.md) for pages, visual decisions and multilingual behavior.

- Sequence: person and purpose → contact strip → categories/products → field photos → grouped videos → complete contact. Use a black hero, white content, large readable type, consistent spacing and real media in original color.
- Product images lead to their corresponding detail view. Provide an explicit enlargement control there. Production `/products/{id}` routes must support direct reload and sharing.
- Use exact product-specific models, search, pagination and inquiry entry. Normalize case/repeated spaces only; other differences require verified explicit aliases. Sort decimal prefixes numerically, unnumbered last. Never borrow another product's models to fill missing data.
- Choose languages for the audience; translate dialogs, errors, metadata and empty states as well as headings. Keep locale across links.

## Implement private data and CRM

Read [backend-and-privacy.md](references/backend-and-privacy.md) before storage, admin, imports or commercial fields.

Public serializers use an explicit allowlist; owner-only APIs use server authorization on every request. Never ship secrets, prices, commercial terms, customers, owner identifiers, source paths or raw records in public HTML, JSON, bundles, errors or caches. Use transactions and repeatable versioned migrations; never recreate a live database to refresh a catalog.

## Verify and deliver

Read [media-performance-and-acceptance.md](references/media-performance-and-acceptance.md) for photo previews, slow customer creation, authorization and release checks. Test desktop/mobile, direct product links, no-match models, locales and failed requests. Use synthetic records in isolated test storage; do not insert fake production customers without authorization. Distinguish generated, tested, saved and deployed. Verify the deployment before supplying a live URL. Deliver usage notes, remaining gaps and rollback information.

## Share this method safely

Create a clean directory and new repository history. Include only original generic instructions/scripts, synthetic fixtures and neutral assets. Never copy an existing site's source repository, assets, backup, database, environment, local paths, domains, account identifiers, credentials or customer/brand material. Check exact filenames, contents, metadata, archives and history before public upload; don't merely replace a few strings in copied private code.
