# Rubric cross-examination

Review based on the supplied assignment PDF, pasted rubric, source code, **24 local regression checks, 11 offline Worker checks, 10 initial live Worker browser assertions, 8 published-site checks repeated after deployment, and 10 production web-search checks**. The rubric contains **80 required + 25 optional = 105 points**. Coverage of a criterion is not a promise of the evaluator’s grade.

Website: [https://33misha.github.io/09-prj-loreal-routine-builder/](https://33misha.github.io/09-prj-loreal-routine-builder/)

Worker: [https://loreal-chatbot.kosulinma.workers.dev/](https://loreal-chatbot.kosulinma.workers.dev/)

The production website was checked directly in a clean browser with no saved connection settings. All 35 cards loaded, the deployed response adapter was present, and real generation/follow-up requests returned HTTP 200 with two and four messages respectively. Both replies appeared without chat errors. This verifies the published app, beyond local or simulated requests.

## Required criteria

| Criterion | Points | Status | Evidence |
| --- | ---: | --- | --- |
| Product selection | 10 | Implemented; browser checked | Card and button clicks toggle selected border/pressed state, count, and list above Generate Routine. Items can also be removed from that list. |
| Routine generation | 10 | Implemented; live checked | Real Worker returned HTTP 200. The displayed evening routine named both selected products: CeraVe Foaming Facial Cleanser and Moisturizing Cream. The request included selected product JSON and preferences. |
| Follow-up chat | 10 | Implemented; live checked | The follow-up request contained system, original user request, original assistant reply, and new user question. The real answer identified the cleanser as the first product; both replies displayed without an unhandled error. |
| Save selected products | 10 | Implemented; browser checked | Product IDs persist in localStorage across an actual page reload. Individual removal and Clear all update saved state and remain correct after reloading. |
| Reveal product description | 5 | Implemented; browser checked | Each card has a native Product details disclosure, usable without hover. Opening it leaves the selection unchanged. |
| Cloudflare Worker integration | 5 | Implemented; live checked | Requests use the supplied HTTPS Worker, with no browser API key. OPTIONS returned 204 and CORS permits local/Pages origins. The frontend handles both the Worker’s reply wrapper and standard choices responses. |
| Reflection: prompt writing | 10 | Substantial draft provided | Exact assignment question answered in REFLECTIONS.md and submission.html. Explains role, selected product data, context, output structure, topic limits, and a proposed comparison without inventing completed experiments. Student should review personal accuracy. |
| Reflection: overcoming roadblocks | 10 | Substantial draft provided | Describes the observed reply-wrapper mismatch, its normalization, live confirmation, and the missing skincare category. Student should review personal accuracy. |
| Reflection: LinkedIn post | 10 | Substantial draft provided | A relevant post discusses data, JavaScript state, storage, full chat history, live integration, and verified search citations. Posting is optional. |

**Required coverage: criteria worth 80/80 points are implemented or answered.** Reflection scoring remains the evaluator’s decision and personal drafts should be reviewed before submission.

## Optional criteria

| Criterion | Points | Status | Evidence |
| --- | ---: | --- | --- |
| Product search | 10 | Implemented; browser checked | Real-time keyword search across name/brand/category/description combines with category filtering and handles zero matches. |
| RTL language support | 5 | Implemented; browser checked | Saved direction toggle mirrors catalog, selected products, and chat. Narrow-screen LTR/RTL overflow checks passed. This is direction support, not an English-to-Arabic translation. |
| Web search | 10 | Implemented; live checked | A real request from GitHub Pages returned HTTP 200 and model gpt-5-search-api-2025-10-14. Native citation annotations named the official CeraVe product page, which appeared as a clickable Web sources link. All 10 production search checks passed. |

**Supported coverage: 80 required + 25 completed optional = criteria worth 105/105 rubric points.** This is an implementation and evidence assessment, not an awarded score. Personal reflection drafts still need the student's review before submission.

## Final live web-search verification

- The public health check confirms deployed Worker version `routine-search-v1`.
- A fresh browser loaded the actual GitHub Pages site and submitted a real product question with search enabled.
- The Worker returned HTTP 200 and confirmed `gpt-5-search-api-2025-10-14`.
- The answer addressed the selected Moisturizing Cream and its place in the selected evening routine.
- The response contained three native `url_citation` annotations for the same official product page. The frontend correctly displayed one deduplicated, clickable Web sources entry.
- The cited [official CeraVe Moisturizing Cream page](https://www.cerave.com/skincare/moisturizers/moisturizing-cream) was independently opened and matched the fragrance-free product information checked in the question.
- The app reported a sourced reply without a chat error. All 10 production search checks passed.
- After this deployment, standard routine generation and contextual follow-up were rechecked on the published site; all 8 production chat checks passed.

The earlier HTTP 400 search failure was resolved by omitting unsupported sampling settings for the search model, forwarding search options, and preserving returned annotations. The server source is documented in [cloudflare-worker.txt](cloudflare-worker.txt), with maintenance instructions in [WORKER_DEPLOYMENT.md](WORKER_DEPLOYMENT.md). The existing API key remains a server-side secret.

The 24 frontend regression checks and 11 offline server checks use simulated service responses; the production chat and web-search checks above use real network responses. The [official OpenAI web search guide](https://developers.openai.com/api/docs/guides/tools-web-search) describes the search model and citation format.

## Assignment details outside scored feature rows

- The interface uses both required brand colors: `#ff003b` and `#e3a535`.
- All 35 supplied products and all 10 categories are reachable; the starter’s missing `skincare` category is included.
- The system message contains only current selected product details. Previous successful user/assistant turns remain intact when selection changes.
- Desktop/mobile layouts, error recovery, safe text/link rendering, and image bounds were checked locally.
- GitHub Pages uses main / (root). After each final push, verify the latest deployed version from a fresh/private browser.
- Submission files contain the website URL, completed LevelUp list, and all reflection answers. Review personal accuracy and export the latest report before uploading through HQ.
- LinkedIn publication is optional. Course upload and LinkedIn posting have not been performed by generating these artifacts.
