# L’Oréal Product-Aware Routine Builder

A plain HTML, CSS, and JavaScript project for browsing 35 L’Oréal brand products, saving selections, and generating personalized beauty routines. The interface uses the assignment’s red `#ff003b` and gold `#e3a535`.

**Website:** [https://33misha.github.io/09-prj-loreal-routine-builder/](https://33misha.github.io/09-prj-loreal-routine-builder/)

**Class Worker:** [https://loreal-chatbot.kosulinma.workers.dev/](https://loreal-chatbot.kosulinma.workers.dev/) is configured in `script.js`. Worker version `routine-search-v1` is deployed. Real routine generation, contextual follow-ups, and live web search with visible citations have passed checks on the published website.

The published GitHub Pages website was verified in a clean browser without saved connection settings. It loaded all 35 products, generated a real two-product routine, and answered a contextual follow-up.

## Run locally

1. Open this repository in VS Code.
2. Use the **Live Server** extension: right-click `index.html` and select **Open with Live Server**. Any static HTTP server is suitable.
3. Use the server’s `http://localhost:…` or `http://127.0.0.1:…` address. Do not double-click `index.html`; the catalog is fetched over HTTP.

There is no build step, package installation, Node SDK, or API key to add.

## Use the routine builder

1. Browse all products, choose a category, or search by name, brand, category, or description. Search and category filters work together.
2. Click a card or its **Add to routine** button. Its selected state and the list above **Generate Routine** update together. Open **Product details** with a mouse, keyboard, or touch to read its description.
3. Remove a selection with its × button, or choose **Clear all**. Selections are saved in this browser and restored after a reload.
4. Optionally choose skin type, routine time, and goals, then select **Generate Routine**.
5. Ask follow-up questions about order, frequency, or adapting the routine. **New conversation** clears chat history while keeping selections.
6. Use **RTL layout** in the header to switch the catalog, selection panel, and chat to right-to-left layout. Switch back with **LTR layout**. This changes direction; it does not translate catalog text.

Selections, layout direction, and a Worker URL entered in settings are saved in the current browser using `localStorage`. Chat history and preferences last for the current page visit. If storage is unavailable, selections still work for that visit and the page explains that saving failed.

## AI connection and conversation

```text
Browser → class-hosted Cloudflare Worker → OpenAI
```

The browser sends `model: "gpt-4.1"` and a `messages` array to the Worker. The system message contains only the current selected products’ name, brand, category, and description, plus preferences. Each successful user question and assistant reply stays in the conversation and is sent with the next request. When selections change, a refreshed system message identifies the current products while earlier user/assistant turns remain available.

The deployed Worker preserves the standard Chat Completions response, including `choices`, `model`, and citation annotations. It also provides a `reply` alias for older classroom frontends. This frontend reads `data.choices[0].message.content` and can also normalize legacy `reply` wrappers with `annotations` or `citations`. Failed requests preserve the previous successful history and saved selections. Loading states prevent overlapping requests. Assistant text is rendered with DOM text nodes and safe links.

Only the Worker holds the OpenAI key. **Never put a key, password, or credential value in this repository, browser settings, or client JavaScript.** The server template references the existing secret binding without containing its value. Students use the public class URL; no key is needed. The underlying message format follows the [official Chat Completions reference](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create).

## Optional live web search

The **Search the web for current information** checkbox requests `gpt-5-search-api` with `web_search_options: { search_context_size: "low" }`. Standard requests use `gpt-4.1`.

The deployed Worker omits unsupported sampling settings for search requests, forwards search options, and preserves citation metadata. A real request from the published website returned HTTP 200 and confirmed model `gpt-5-search-api-2025-10-14`. The response cited the official CeraVe Moisturizing Cream page; the frontend displayed that citation as a clickable **Web sources** link. The source page was opened independently and matched the checked product information.

`sources.js` displays returned `url_citation` metadata and deduplicates repeated sources. Ordinary model-generated links alone are not counted as evidence of live search. Missing metadata still produces an explicit warning. All 10 production web-search checks passed. See the [official OpenAI web search guide](https://developers.openai.com/api/docs/guides/tools-web-search) for the Chat Completions search integration.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Catalog, selection panel, preferences, chat, connection settings |
| `style.css` | Brand styling, responsive layout, keyboard focus, RTL support |
| `script.js` | Filtering, selection, storage, history, Worker requests |
| `sources.js` | Safe assistant formatting and returned citations |
| `cloudflare-worker.txt` | Complete server replacement for the existing Worker; no secret values |
| `WORKER_DEPLOYMENT.md` | Verified deployment status and future Worker deployment instructions |
| `products.json` | Supplied product data and image URLs |
| `RUBRIC_REVIEW.md` | Final criterion-by-criterion implementation and verification evidence |
| `REFLECTIONS.md` | Reviewable reflection answers |
| `submission.html` / `submission.pdf` | Printable submission report and PDF export |

Product images use the supplied external URLs. If an image fails, the product name, description, and selection control remain available.

## Verification and rubric coverage

- **24 local browser integration checks passed**, covering catalog/categories, selection, actual page reloads, search, full history, error recovery, safe output, citation rendering, image bounds, and 320px/375px LTR/RTL layouts. These regression checks used simulated AI responses.
- **10 live browser assertions passed** using the supplied Worker and real network requests. A generated evening routine named both selected products; the contextual follow-up identified the cleanser as the first step. Both replies appeared in chat, the follow-up sent the previous turns, and no unhandled request error occurred.
- **8 published-site checks passed again after the Worker deployment** from the actual GitHub Pages origin in a clean browser with no saved settings. The deployed response adapter was present, 35 cards loaded, and the real generation/follow-up requests returned HTTP 200 with two and four messages respectively. Both replies displayed without chat errors.
- The Worker’s browser `OPTIONS` preflight returned **204**, with CORS permitting the local and GitHub Pages origins.
- **10 live web-search checks passed** on the published website: deployed version marker, native model/options, HTTP 200, confirmed search model, real citation metadata, relevant answer, visible source links, official source, and no chat errors.
- **11 offline Worker checks passed** before deployment, covering request validation, model-specific parameters, full conversation forwarding, preserved citations, CORS, and error recovery. The upstream AI response was simulated in these checks.

The rubric totals **80 required points plus 25 optional points = 105**. All required feature implementations, all three bonus features, and substantial reflection drafts now cover criteria worth **105 points**. This is an implementation and evidence assessment, not a guaranteed grade. Review personal reflection accuracy before submitting. See [RUBRIC_REVIEW.md](RUBRIC_REVIEW.md) for the complete cross-examination.

## Publishing and submission

GitHub Pages is configured for **main / (root)**. After changes, commit and push to `main`, allow Pages to rebuild, and check the published page in a fresh/private browser so saved settings cannot hide a deployment problem.

1. Review `REFLECTIONS.md` and `submission.html` for personal accuracy. Product search, RTL, and live web search are the completed LevelUps.
2. Verify the live URL above and confirm the latest deployed version can generate a routine and answer a follow-up.
3. Use the updated `submission.pdf`, or open `submission.html` and choose **Print → Save as PDF**. If the course requires its original document, copy the reviewed answers into it and export that completed document as PDF.
4. Submit the live GitHub Pages URL and completed PDF to the project submission page on HQ. Use the website URL, not the repository or Codespace URL.

Creating these files does not upload a course submission or publish the optional LinkedIn post.

## Connection setup

The supplied public class Worker URL is already the `WORKER_URL` value at the top of `script.js`; new visitors do not need browser setup. **Advisor connection settings** can override that URL in the current browser only. For a future endpoint change, update the public constant for all visitors, or use settings for a local trial.

The class service must accept JSON `POST` requests and browser `OPTIONS` preflight requests. Its CORS policy must permit the local preview origin and `https://33misha.github.io`. Any Worker changes and API credentials remain with the class service maintainer.
