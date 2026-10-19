# Backend and privacy

This is an implementation contract, not an included server. Adapt to the existing schema and chosen host. Hiding controls in JavaScript is not authorization.

| Entity | Public projection | Private data |
| --- | --- | --- |
| Product | ID, approved name/category/media/order | Internal paths, unpublished notes |
| Model | Size, code, approved indices/status | Costs, selling prices, quote terms, source files/rows |
| Inquiry | Submission acknowledgment only | Identity, contact, message, selections, follow-up |
| Customer | None | Contacts, notes, tags, tasks, attachments |

`GET /api/products/{id}/models?q=&page=` queries exact ID, caps page size and serializes approved columns only. Unknown product: 404; known product without models: pending-confirmation state. Never serialize `SELECT *` or return a private record after removing just its price. Check nested fields, errors, bundles and page source.

Protect each private read/write with verified server identity and explicit owner/role authorization. Return 401 when unauthenticated, 403 when unauthorized. Recheck identity/role on every request; never copy another site's owner identifier. Use secure sessions, origin/CSRF checks on writes and `Cache-Control: private, no-store`. Public caches must never reuse authenticated private responses.

## Persistent updates

- Append-only versioned migrations run once with a ledger. Renames/order updates are idempotent and preserve IDs; changing initial seeds is insufficient for existing databases.
- Preserve customer/inquiry/price rows. Check affected counts; back up structural migrations and document rollback limits.
- Explicit aliases carry review evidence; unmatched models go into a private review report.
- Parameterize queries, validate IDs and bound input. Protect attachments and sanitize filenames. Never statically expose a private upload directory.

## Customer workspace

Use real overview counts and due tasks, searchable customers with status/tags/source/pagination, then a detail pane for contacts, product interests, next action and chronological notes. Separate customer lifecycle from inquiry lifecycle. Empty states explain the first action; don't invent metrics.

Normalize contacts while retaining raw inputs privately. Lowercase email domains; normalize phones with known country context, never guess unknown country codes. Preview import columns and duplicates. Skip duplicates by default; merging needs a reviewed field policy. Validate encodings, cap batch sizes, escape formula prefixes in CSV exports. Use reversible archive/restore. Don't send messages/emails without authorization.

Transactions cover related writes. Revision numbers reject stale edits with recoverable conflicts; idempotency keys prevent duplicate submissions and verify retries against their original operation. Return the committed record and preserve drafts on failure. Don't claim success before persistence succeeds.

## Slow customer creation

Measure click-to-dialog, submit-to-request, server duration and render-to-confirmation separately, with redacted timings. Verify whether heavy bundles, serial calls, auth redirects, cold starts, repeated migrations/backfills, unindexed duplicate checks or full-list refreshes cause the delay.

Open forms without loading all CRM data. Use one validated mutation, batched duplicate/contact checks and a transaction. Add indexes justified by query plans for normalized contacts, owner/status, follow-up and sort fields. Run compatibility backfills once with progress/version markers, never per save. Preserve session/authorization checks. Render the committed response and refresh lists/counts in the background. Never optimize by publicly caching private data or skipping validation.
