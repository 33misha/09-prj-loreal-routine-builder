# Rubric cross-examination

Review based on the supplied assignment PDF, pasted rubric, source code, **24 local regression checks, 10 live Worker browser assertions, and 8 published-site checks**. The rubric contains **80 required + 25 optional = 105 points**. Coverage of a criterion is not a promise of the evaluator’s grade.

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
| Reflection: LinkedIn post | 10 | Substantial draft provided | A relevant post discusses data, JavaScript state, storage, full chat history, live integration, and the remaining optional search limitation. Posting is optional. |

**Required coverage: criteria worth 80/80 points are implemented or answered.** Reflection scoring remains the evaluator’s decision and personal drafts should be reviewed before submission.

## Optional criteria

| Criterion | Points | Status | Evidence |
| --- | ---: | --- | --- |
| Product search | 10 | Implemented; browser checked | Real-time keyword search across name/brand/category/description combines with category filtering and handles zero matches. |
| RTL language support | 5 | Implemented; browser checked | Saved direction toggle mirrors catalog, selected products, and chat. Narrow-screen LTR/RTL overflow checks passed. This is direction support, not an English-to-Arabic translation. |
| Web search | 10 | Blocked by current Worker; not claimed | Frontend sends gpt-5-search-api and native web_search_options and safely renders returned citations. Actual service responds HTTP 400: “Model incompatible request argument supplied: temperature.” No live sourced response is verified. |

**Supported coverage: 80 required + 15 completed optional = 95/105 possible rubric points.** This is an evidence-based coverage assessment, not an awarded score. The remaining 10 points require working live web search with visible sources.

## Remaining web-search work

A complete replacement for the pasted Worker source is ready in [cloudflare-worker.txt](cloudflare-worker.txt). [WORKER_DEPLOYMENT.md](WORKER_DEPLOYMENT.md) includes a copyable instruction for the Cloudflare-connected agent and dashboard steps. It keeps the existing secret binding and must be deployed to the existing Worker before live search can be verified. The frontend also accepts the `citations` field used by the proposed revision, as well as standard annotations.

The replacement passed 11 offline server contract checks, including model-specific request options, complete conversation forwarding, preserved citations, CORS, and error recovery. The 24 frontend regression checks also passed with the proposed `reply`/`citations` wrapper. These simulated checks do not replace live search verification.

The frontend does not send `temperature`. The live error indicates that the class service adds it; a probe with `temperature: null` still failed. The class Worker must omit that field for the searching model, forward the model/search options, and preserve citation annotations in its response. It can return the standard Chat Completions shape or `{ reply, annotations }`, both accepted by the frontend.

After a server-side change, send a current product question with search enabled, confirm the returned answer contains real citation metadata, open the visible sources, and verify that the information is current and relevant. Mock citation-rendering checks demonstrate frontend behavior only; they cannot earn the live-search criterion by themselves.

The following are repair fragments for the existing Worker’s POST handler, not a deployed change or a complete replacement Worker. Keep its existing secret access, upstream fetch, CORS headers, OPTIONS handler, and error handling. Inspect the current Worker source before adapting variable names and placement. No key belongs in this frontend.

```js
// Read the browser's messages and allow only the two models used by this app.
const body = await request.json();
const selectedModel = body.model === "gpt-5-search-api"
  ? "gpt-5-search-api"
  : "gpt-4.1";

// Build the object passed to the existing OpenAI fetch call.
const openaiBody = {
  model: selectedModel,
  messages: body.messages,
};

if (selectedModel === "gpt-5-search-api") {
  // Search requests must omit temperature completely, including null.
  openaiBody.web_search_options = body.web_search_options || {};
} else {
  // Keep ordinary generation settings only on the standard model.
  openaiBody.temperature = 0.7;
}

// In the existing upstream fetch options, use:
// body: JSON.stringify(openaiBody)
```

After the existing upstream response has been parsed into `result`, preserve the message’s annotations instead of discarding them. In this fragment, `corsHeaders` means the existing Worker’s CORS headers object; keep its actual variable name and contents.

```js
// Keep real citation metadata so the browser can display Web sources.
const message = result.choices[0].message;
return new Response(JSON.stringify({
  reply: message.content,
  annotations: message.annotations || [],
  model: result.model,
}), {
  headers: {
    ...corsHeaders,
    "Content-Type": "application/json",
  },
});
```

The service has not been repaired by documenting these fragments. After the maintainer deploys the adapted change, rerun the live search/citation checks above. API keys remain in the Worker’s server-side secrets. See the [official OpenAI web search guide](https://developers.openai.com/api/docs/guides/tools-web-search) for the search model and citation response format.

## Assignment details outside scored feature rows

- The interface uses both required brand colors: `#ff003b` and `#e3a535`.
- All 35 supplied products and all 10 categories are reachable; the starter’s missing `skincare` category is included.
- The system message contains only current selected product details. Previous successful user/assistant turns remain intact when selection changes.
- Desktop/mobile layouts, error recovery, safe text/link rendering, and image bounds were checked locally.
- GitHub Pages uses main / (root). After each final push, verify the latest deployed version from a fresh/private browser.
- Submission files contain the website URL, completed LevelUp list, and all reflection answers. Review personal accuracy and export the latest report before uploading through HQ.
- LinkedIn publication is optional. Course upload and LinkedIn posting have not been performed by generating these artifacts.
