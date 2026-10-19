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
| alert-dialog | alert-dialog | d44513e3a157229eea1a9190aadbc479e356b47eb13c98e1a91ce4366fa11cf6 |
| avatar | avatar | 2fe6b7b5551b8867a42f764d7616d8a271409432ce696d32611d0d4b74341e9b |
| badge | badge | 60f73554b462ec5e2929ccc58c0522b069c07e1268dbfb67749c2837347b788b |
| button | button | 1e65556bde3071f90f61825cf573aec74bdd8695824470bea3dae4d68a6b8fc8 |
| button-group | group | d2392c54a90e353762779639971bb9aaa44759a7bda81ea0cf1462afbf4492b0 |
| calendar | calendar | 547ebebda2747dadee61815f41448a2b6cecce3ad125806666df7595013896f0 |
| checkbox | checkbox | a1b8b4180a39a47c47bd2b50e432d0911da6efe3b963b065b3b5cb8893760047 |
| context-menu | context-menu | c7dd4deefe1b4180ea242c0a97c3cca9a5112bc6113e212413f11be4738432fc |
| dialog | dialog | 29e99f5d39307acd3781ee0c8f78aabe6d637f667fb3b7893820e4621ddcce7b |
| drawer | drawer | 5853db0687904d22f40ec8ad641a99df5bff4aa8049bbd82503a82aa556ded4e |
| dropdown-menu | menu | 19ed2b219a4a3606488d6bf66d13055bce7b6d5d438f77a1caea5648e4c44aae |
| field | field | 02ffda39f73f04638f580fd1fbb76e783cb252f9a87ecebdd62fb4bd0d1393ff |
| field | fieldset | 1ec36d2a2c60fd1ba229682a876f8d672ade66019513bac1a6747885d369f2a6 |
| form | form | c08b75b48a90dd349763720e4ffb5423ae348ec0ef43c8c96110695d6fcf7404 |
| hover-card | preview-card | 44741ce4217d89c19a485d6973c22c821ed9cf86b15dc03c7094308ae7faa6ba |
| input | input | 3d488d491eb4e63642adc8b9354b0b0cc5b8ec4e284bbc26da7e2516f24980a4 |
| input-group | input-group | 999f1e8aa29d4520aa4086f508cfd55503547822e4a6c4a2314e2fb14a351452 |
| input-otp | otp-field | 4122b6f91e0c011a9bfe40b4ecad4d0b89a7b371e773adac6af6b2bcc5ac033e |
| kbd | kbd | ad8f26b95d8307f460316cd27a2b595d04069df2561395b5d39067a99e407cb5 |
| label | label | edaf5fb049b3e2f27ddd70a6c6772c7d99e920c589b41019b8f4fa602113e695 |
| popover | popover | ff9b981ce4e68b86a266f69480c59967c7065aacfa2d4ce927d91a1eff0035cf |
| radio-group | radio-group | b2479e9967f0ba48d1acbb58a4fff7b919aa746bb8a61cbbff389baac02abbb7 |
| scroll-area | scroll-area | 6274eace4599cba26e731b0f02cd2307d2207947162ccc575e45984e87aa269f |
| select | select | aa8821bbb4bd6b8b52a6cbaaf8d995f48b1001ad93d4bfa4e5b91b5e6d5f66a0 |
| separator | separator | 48393a9f365097e350bb33f0e84d2df25efd6b374868aa075f8d6011378c1d6e |
| sheet | sheet | f1d3361a490c9d9a49a4289604aaf6995cb0b138728c3068ba94ee6c9337978a |
| skeleton | skeleton | 02e61d00c76b7ed5a1979c37c2a86b8a837a013909e84ac21c40bb5b56f9afd2 |
| slider | slider | 952c61cfbb6950045792adf00f772a986bb07c7b7986caf40e509d60deb92ce6 |
| spinner | spinner | 5116d0ec549bf70d20d5359a485e6792b6c87d89a389102ad6c3f44312c23972 |
| switch | switch | 713321db777570c883348696495f9b12f47f63f1d567b8eab42c27a8d0625c36 |
| textarea | textarea | 3e30e41c099d7343cb0a603557acd4e8b7c94b43139a7a489df322c04c5f601c |
| toggle | toggle | a32372d0eaa291bc81f61f4ddb1f5bb827c507fd53de03c6f709adc242ee5bfb |
| toggle-group | toggle-group | 8c67854bffcf762299fb989721e47da30fea3268cb969fdc6c775c3fe89982bb |
| tooltip | tooltip | 0ac59089d1d813b7eb1cd9e08ed2ff3b3931e4024df649ddb45b1eb43d50f694 |

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
