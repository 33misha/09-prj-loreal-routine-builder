# L’Oréal Product-Aware Routine Builder

A plain HTML, CSS, and JavaScript project for browsing 35 L’Oréal brand products, saving selections, and generating personalized beauty routines. The interface uses red `#ff003b` and gold `#e3a535` accents.

**Website:** [https://33misha.github.io/09-prj-loreal-routine-builder/](https://33misha.github.io/09-prj-loreal-routine-builder/)

**Class Worker:** [https://loreal-chatbot.kosulinma.workers.dev/](https://loreal-chatbot.kosulinma.workers.dev/) is configured in `script.js`. Worker version `routine-search-v1` is deployed. Real routine generation, contextual follow-ups, and live web search with visible citations have passed checks on the published website.

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

The deployed Worker omits unsupported sampling settings for search requests, forwards search options, and preserves citation metadata. The frontend displays returned citations as clickable **Web sources** links.

`sources.js` reads `url_citation` metadata and deduplicates repeated sources. Missing metadata produces an explicit warning. See the [official OpenAI web search guide](https://developers.openai.com/api/docs/guides/tools-web-search) for the Chat Completions search integration.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Catalog, selection panel, preferences, chat, connection settings |
| `style.css` | Brand styling, responsive layout, keyboard focus, RTL support |
| `script.js` | Filtering, selection, storage, history, Worker requests |
| `sources.js` | Safe assistant formatting and returned citations |
| `cloudflare-worker.txt` | Complete server replacement for the existing Worker; no secret values |
| `products.json` | Supplied product data and image URLs |

Product images use the supplied external URLs. If an image fails, the product name, description, and selection control remain available.

## Publishing

GitHub Pages is configured for **main / (root)**. After changes, commit and push to `main`, allow Pages to rebuild, and check the published page in a fresh/private browser so saved settings cannot hide a deployment problem.

## Connection setup

The supplied public class Worker URL is already the `WORKER_URL` value at the top of `script.js`; new visitors do not need browser setup. **Advisor connection settings** can override that URL in the current browser only. For a future endpoint change, update the public constant for all visitors, or use settings for a local trial.

The class service must accept JSON `POST` requests and browser `OPTIONS` preflight requests. Its CORS policy must permit the local preview origin and `https://33misha.github.io`. Any Worker changes and API credentials remain with the class service maintainer.
