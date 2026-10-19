# Upstream pin

kosori ports `zen` from [coss/ui](https://coss.com/ui). This file records the upstream revision a Port was taken from and the exact bytes of every ported item, so a future re-sync has a starting point. No upstream snapshot is vendored in this repository.

## Revision

| Field | Value |
| --- | --- |
| Research date | 2026-10-19 |
| Registry | `coss ui`, `https://coss.com/ui/r` |
| Registry version | Not published; the fetch date identifies the revision |
| Fetched | 2026-10-19 |

The registry index carries no `version` field. When it does, record that value instead of the fetch date. Until then the fetch date is the revision: a later fetch that returns different bytes invalidates the pins below.

## Entries

One row per Port, ordered alphabetically by kosori name. No item is a Port yet; the first row lands with the first port batch.

| kosori | coss | sha256 |
| --- | --- | --- |

The hash is the SHA-256 of the upstream file's content exactly as the registry serves it: the `files[0].content` string after JSON decoding, with its original line endings and trailing newline, and no bytes added or removed.

## Adding an entry

A port adds its row in the same commit as its source, catalog entry, Example and page.

1. Resolve the item from the pinned registry, for example `https://coss.com/ui/r/button.json`.
2. Hash the served file content without changing it:

   ```sh
   curl -sS https://coss.com/ui/r/button.json \
     | jq -j '.files[0].content' \
     | sha256sum
   ```

3. Add `| <kosori-name> | <coss-name> | <sha256> |` in alphabetical order by kosori name.

A renamed item records both names, for example `dropdown-menu` and `menu`. An item that is not ported from coss has no row.
