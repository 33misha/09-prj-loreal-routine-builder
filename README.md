# L’Oréal Product-Aware Routine Builder

A plain HTML, CSS, and JavaScript project for browsing 35 L’Oréal brand products, saving a selection, and creating a personalized beauty routine with an AI advisor. The interface uses the assignment’s red `#ff003b` and gold `#e3a535`.

**Current connection status:** the project deliberately contains a placeholder Worker URL. Browsing, selection, saved products, product search, descriptions, and RTL layout work independently. Real AI replies and live web-search results need the class-hosted Worker. Connect it as the final setup step below.

## Run locally

1. Open this repository in VS Code.
2. Use the **Live Server** extension to open `index.html` with **Open with Live Server**. Any static HTTP server is also suitable.
3. Use the `http://localhost:…` or `http://127.0.0.1:…` address the server provides. Do not double-click `index.html`: the browser needs HTTP to fetch `products.json`.

There is no build step, package installation, Node SDK, or API key to add.

## Use the routine builder

1. Browse all products, choose a category, or search by name, brand, category, or description. Search and category filters work together.
2. Click a product card or its **Add to routine** button. The selected state and **Selected products** list update together. Open **Product details** with a mouse, keyboard, or touch to read its description.
3. Remove an individual selection with its × button, or choose **Clear all**. Selections are saved in this browser with `localStorage` and restored after a reload.
4. Optionally choose skin type, routine time, and goals. Select **Generate Routine** after the final connection setup to request a routine using the selected products.
5. Ask follow-up questions about order, frequency, or adapting the routine. **New conversation** resets chat history while keeping selections.
6. Use **RTL layout** in the header to switch the catalog, selection panel, and chat to right-to-left layout. Switch back with **LTR layout**. This changes direction, not the language of catalog text.

Selections, layout direction, and a Worker URL entered in settings are saved only in the current browser. Chat history and personalization preferences last for the current page visit. If browser storage is unavailable, selections remain usable for that visit and the app explains that saving failed.

## How the AI connection works

```text
Browser → class-hosted Cloudflare Worker → OpenAI
```

The browser posts a JSON object containing `model` and a `messages` array to the Worker. The default model is `gpt-4.1`. The system message includes the current selected products’ name, brand, category, and description, along with preferences. Each successful user question and assistant reply stays in the conversation and is sent with the next request. The system message is refreshed when selections change so the advisor can distinguish current products from earlier turns.

The response is read from `data.choices[0].message.content`. Failed requests do not erase the previous successful history or saved selections. Loading states prevent overlapping requests, and errors provide a way to retry. Assistant text is rendered with DOM text nodes and safe web links.

Only the Worker holds the OpenAI key. **Never put a key, password, authorization header, or credentials in this repository, browser settings, or client JavaScript.** Students use the public class Worker URL supplied by their instructor. See the [official Chat Completions reference](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create) for the underlying message format.

### Optional real-time web search

The chat’s **Search the web for current information** checkbox explicitly selects `gpt-5-search-api` and sends `web_search_options: { search_context_size: "low" }`. This optional mode uses a search-capable model; standard requests remain on `gpt-4.1`.

The class Worker must support and forward both `model` and `web_search_options`, and return `choices[0].message.annotations` with its `url_citation` metadata. `sources.js` displays those returned citations as visible **Web sources** links. Ordinary model-generated links alone are not treated as proof of live searching. If the response has no citation metadata, the page says that live search is unverified.

**Web-search bonus status: frontend implemented; live Worker/model support and citations still need verification.** A checkbox or a link generated without live search is not sufficient to claim this bonus. See the [official OpenAI web search guide](https://developers.openai.com/api/docs/guides/tools-web-search) for the Chat Completions search integration. Worker changes, if needed, belong to the class service maintainer; no key belongs in this frontend.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Catalog, selection panel, preferences, chat, and connection settings |
| `style.css` | Brand styling, responsive layout, keyboard focus, and RTL support |
| `script.js` | Catalog filtering, selection, storage, full conversation history, and Worker requests |
| `sources.js` | Safe assistant formatting and returned web-search citations |
| `products.json` | Supplied product names, brands, categories, descriptions, and images |
| `REFLECTIONS.md` | Reviewable reflection answers and submission details |
| `submission.html` | Printable submission report; use the browser’s Print → Save as PDF |
| `submission.pdf` | Exported reflection/submission draft; update after final live verification |

Product images use the supplied external image URLs. If an image cannot load, its product name, description, and selection control remain available.

## Rubric coverage and final checks

The rubric contains **80 required points and 25 optional points, totaling 105**. This table maps the implementation to each criterion; it does not promise a grade.

| Criterion | Points | Implementation / remaining check |
| --- | ---: | --- |
| Product selection | 10 | Card/button toggle, selected visual state, synchronized list, individual removal |
| Routine generation | 10 | Selected product JSON and preferences sent to the Worker; verify a real personalized reply after connection |
| Follow-up chat | 10 | Full successful history resent with each request; verify live contextual follow-up |
| Save selected products | 10 | Save IDs, restore after reload, remove individually, clear all |
| Reveal product description | 5 | Native keyboard/touch-accessible Product details disclosure on each card |
| Cloudflare Worker integration | 5 | HTTPS Worker-only requests; no frontend key; real endpoint/CORS verification pending |
| Reflection: prompt writing | 10 | Substantial draft in `REFLECTIONS.md`; review for personal accuracy |
| Reflection: roadblocks | 10 | Substantial draft describing a real catalog/category mismatch |
| Reflection: LinkedIn post | 10 | Written post draft; posting is optional |
| Bonus: web search | 10 | Search model request and visible citation handling; live support/citations pending |
| Bonus: product search | 10 | Real-time keyword search combined with the category dropdown |
| Bonus: RTL | 5 | Saved direction toggle and logical layout styles for catalog, selection, and chat |

Local verification completed: **24 browser integration checks passed** in headless Chrome, covering selection, real page reloads, combined filters, full history, error recovery, citation rendering, safe output, image bounds, and 320px/375px LTR and RTL layouts. Desktop and mobile screenshots were also reviewed. AI responses were simulated for these checks; they did not contact a real Worker.

Before submitting, check these behaviors in a browser:

- Select two products; remove one from its card and one from the selected list. Confirm selected states/counts agree.
- Reload with selections saved. Then clear all and reload again; confirm the list stays empty.
- Combine a category with matching and nonmatching search terms. Open descriptions using the keyboard.
- Check narrow mobile and wider desktop screens in both LTR and RTL modes.
- After connection, generate a routine and ask “Which of those products should I use first?” Confirm the selected products and previous reply inform the answer.
- Change the selection and ask another question; confirm the latest selection is used.
- Test live search with a current product question and open the returned **Web sources**. Claim the bonus only after real citations appear.
- Confirm failures leave the app usable and the browser console has no uncaught errors.

Live AI/Worker responses, real search citations, and the final public GitHub Pages site are pending until those external services are connected and checked. Simulated request checks cannot establish live service availability or response quality.

## Prepare deployment and submission

The expected project URL is [https://33misha.github.io/09-prj-loreal-routine-builder/](https://33misha.github.io/09-prj-loreal-routine-builder/). **This is the expected URL, not a verified published site.**

After the final connection step and local checks:

1. Review the reflection drafts in `REFLECTIONS.md` and `submission.html`, including the LevelUp status and the actual live URL.
2. Review the changed files, commit them, and push to your repository’s `main` branch.
3. In GitHub, open **Settings → Pages**. Choose **Deploy from a branch**, select **main** and **/ (root)**, and save.
4. Wait for GitHub Pages to finish deploying. Use the published URL shown by GitHub and verify it in a private/incognito browser. Browser-local connection settings from your development session do not transfer to visitors.
5. Open `submission.html`, update any remaining status notes, and use **Print → Save as PDF**. Copy the reviewed answers into the course document if required, then export that completed document as PDF.
6. Submit the live GitHub Pages URL and the completed PDF to the project submission page on HQ. Share the live website address, not the repository or Codespace URL.

The Worker connection, final live verification, and GitHub Pages publication remain pending.

## Final setup step: connect the class Worker

Everything above can be prepared while the placeholder remains. When the instructor supplies the real **public HTTPS class Worker URL**:

1. Replace the placeholder value of `WORKER_URL` near the top of `script.js` with that public URL. Keep the frontend key-free. Publishing the real URL in this constant is necessary for new visitors to connect automatically.
2. For a local trial, you can instead open **Advisor connection settings** on the page, enter the URL, and choose **Save connection**. This override applies only to that browser. It does not configure the published site for other people.
3. Confirm the Worker accepts JSON `POST` requests, handles browser `OPTIONS` preflight requests, and allows the local preview origin and `https://33misha.github.io` in its CORS policy. The class maintainer handles Worker access and configuration.
4. Complete the live routine, follow-up, and optional search checks above. The search mode requires the additional Worker support described earlier. Leave it off for standard `gpt-4.1` use.
5. Return to the deployment/submission steps and publish the connected version. Verify it from a fresh private window so no saved URL masks an unchanged placeholder.
