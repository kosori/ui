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

One row per Port, ordered alphabetically by kosori name.

| kosori | coss | sha256 |
| --- | --- | --- |
| avatar | avatar | 2fe6b7b5551b8867a42f764d7616d8a271409432ce696d32611d0d4b74341e9b |
| badge | badge | 60f73554b462ec5e2929ccc58c0522b069c07e1268dbfb67749c2837347b788b |
| button | button | 1e65556bde3071f90f61825cf573aec74bdd8695824470bea3dae4d68a6b8fc8 |
| button-group | group | d2392c54a90e353762779639971bb9aaa44759a7bda81ea0cf1462afbf4492b0 |
| input | input | 3d488d491eb4e63642adc8b9354b0b0cc5b8ec4e284bbc26da7e2516f24980a4 |
| kbd | kbd | ad8f26b95d8307f460316cd27a2b595d04069df2561395b5d39067a99e407cb5 |
| label | label | edaf5fb049b3e2f27ddd70a6c6772c7d99e920c589b41019b8f4fa602113e695 |
| separator | separator | 48393a9f365097e350bb33f0e84d2df25efd6b374868aa075f8d6011378c1d6e |
| skeleton | skeleton | 02e61d00c76b7ed5a1979c37c2a86b8a837a013909e84ac21c40bb5b56f9afd2 |
| spinner | spinner | 5116d0ec549bf70d20d5359a485e6792b6c87d89a389102ad6c3f44312c23972 |
| textarea | textarea | 3e30e41c099d7343cb0a603557acd4e8b7c94b43139a7a489df322c04c5f601c |
| toggle | toggle | a32372d0eaa291bc81f61f4ddb1f5bb827c507fd53de03c6f709adc242ee5bfb |
| toggle-group | toggle-group | 8c67854bffcf762299fb989721e47da30fea3268cb969fdc6c775c3fe89982bb |

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
