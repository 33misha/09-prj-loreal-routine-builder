# Project 9 submission and reflections

These first-person answers are **drafts for the student to review and personalize**. They describe the implementation and observed debugging without inventing personal prompt experiments. Review them before copying them into the course document.

## 1. Paste your website’s URL

[https://33misha.github.io/09-prj-loreal-routine-builder/](https://33misha.github.io/09-prj-loreal-routine-builder/)

This is the verified GitHub Pages website address, rather than the repository or Codespace link. Eight checks passed on the published site in a clean browser, including real routine generation and a contextual follow-up without saved connection settings.

## 1B. Did you do any of the LevelUps? To help the evaluator notice—and give you the bonus points you deserve!—please list them here:

- **Product search:** Real-time search filters by product name, brand, category, and description. It works with the category dropdown and updates the result count.
- **RTL language support:** A saved direction toggle adjusts the product grid, selected products area, and chat between LTR and RTL. It changes layout direction without claiming that the English catalog is translated.
- **Web search is not claimed:** The frontend requests a search-capable model and can render actual citations, but the live class Worker rejects search requests because it supplies an incompatible `temperature` argument. The Worker also needs to preserve citation metadata before this bonus can be completed.

## 2. You controlled what the AI saw and how it responded using a system prompt. What did you learn about writing better prompts? Did you try any different versions? How did you make sure the AI stayed on topic and useful?

I learned that a useful prompt needs to explain the advisor’s role, the data it should rely on, and the kind of answer the user needs. A general instruction like “make a beauty routine” leaves too many details open. The finished system prompt identifies the assistant as a L’Oréal beauty advisor, supplies selected products as JSON, and asks for numbered steps with exact product names, order, frequency, and morning or evening guidance. Optional skin type and goals make the request more personal without making those details mandatory.

Giving the model context is also part of prompt writing. Each request includes the successful conversation history and a fresh system message containing the current selection. That allows a follow-up to refer to the routine while making it clear when products change. The prompt asks the advisor to stay within beauty and routine topics, redirect unrelated requests, avoid inventing products or claims, and ask for clarification when necessary. It also explains that not every selected product must be forced into the same routine. A real browser check generated a routine with the two selected CeraVe products, and the follow-up correctly explained which came first.

I have not completed a controlled comparison of different prompt versions, so I would not claim that I ran that experiment. A useful next comparison would be a broad prompt versus this more specific one using identical products and preferences, followed by an order question and an unrelated question. I would compare product accuracy, clear steps, remembered context, and whether the advisor stays on topic. This project showed me why precise instructions and relevant data are more useful than simply making a prompt longer.

## 3. Working with a mix of code, data, and AI often means things don’t work exactly how you expect. Describe a moment in this project when something didn’t go the way you thought it would—in the UI, the API response, or somewhere in between. What did you do to figure it out?

One roadblock appeared when connecting the real class Worker. The frontend expected the standard Chat Completions response at `data.choices[0].message.content`, but the service returned a successful response shaped as `{ "reply": "…" }`. A successful HTTP status did not automatically mean that the page could find the answer. Inspecting the actual response body showed the mismatch. The solution was to normalize the Worker’s reply into the standard message structure while continuing to accept a normal `choices` response. A live browser check then confirmed that the generated routine and contextual follow-up both appeared in the chat.

Another issue was the relationship between the category dropdown and product data. The catalog included `skincare` treatments, but the original menu did not have that category value. Comparing the dropdown values with `products.json` identified the problem. Adding a “Skincare & treatments” option with the exact value `skincare`, along with “All categories,” made the catalog easier to browse correctly.

These issues taught me to inspect the data crossing each boundary: the catalog, selected IDs, request messages, response body, and visible chat. The optional search mode exposed another boundary: the Worker adds a `temperature` argument that the search model rejects. That needs a server-side fix, so I documented it instead of presenting ordinary generated links as proof of live search. My main lesson is that a clear error and an honest diagnosis are more useful than assuming a request worked because one part of the process succeeded.

## 4. Write a short LinkedIn post reflecting on what you learned while building your routine builder and chatbot.

I built a L’Oréal product-aware routine builder with HTML, CSS, and JavaScript. Users can browse real product data, combine keyword and category filters, save their selections, and generate a personalized routine through a class-hosted Cloudflare Worker.

The biggest lessons were keeping the interface in sync with application state, using `localStorage` for saved products, and sending the full conversation so follow-up questions have context. Connecting the live service also taught me to inspect response formats: a valid API reply still needs to match what the frontend reads.

The project includes accessible product descriptions and an RTL layout option. Live routine generation and contextual follow-ups passed browser checks. Optional live web search is my remaining improvement; I identified the Worker compatibility issue and documented the change it needs.

Explore the project: https://33misha.github.io/09-prj-loreal-routine-builder/

#JavaScript #WebDevelopment #AI #LearningInPublic

---

## Before submitting

- Review these drafts so they reflect your learning and contributions accurately. Add only prompt comparisons or experiments that actually occurred.
- Check the published GitHub Pages page and latest routine/follow-up behavior in a fresh private browser.
- List product search and RTL as completed bonuses. Do not claim the web-search bonus until the Worker is fixed and real citations are verified.
- Use the updated `submission.pdf`, or print `submission.html` to PDF. Copy the reviewed answers into the course document if required, then export it as PDF.
- Upload the completed PDF and live website URL through HQ.

Posting the LinkedIn draft publicly is optional. No LinkedIn post or course upload is made by creating these files.
