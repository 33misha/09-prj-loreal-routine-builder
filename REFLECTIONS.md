# Project 9 submission and reflections

These are substantial first-person **drafts for the student to review and personalize**. They describe the implementation in this repository without claiming live API tests, prompt experiments, deployment, or personal experiences that have not been confirmed. Review the answers before copying them into the course document.

## 1. Paste your website’s URL

Expected GitHub Pages URL: [https://33misha.github.io/09-prj-loreal-routine-builder/](https://33misha.github.io/09-prj-loreal-routine-builder/)

**Publication is not verified.** Replace this status with the confirmed live URL after connecting the class Worker, publishing, and testing in a private browser. The submission needs the live site, not the repository link.

## 1B. Did you do any of the LevelUps? To help the evaluator notice—and give you the bonus points you deserve!—please list them here:

- **Product search:** A real-time search field filters the catalog by product name, brand, category, and description. The search works together with the category dropdown and displays the result count.
- **RTL language support:** A persistent header control switches the product grid, selected products area, and chat layout between LTR and RTL. The interface direction changes without claiming that the English catalog has been translated.
- **Web search:** The frontend includes an optional search mode using `gpt-5-search-api`, sends `web_search_options` through the Worker, and displays actual response citation metadata as clickable Web sources. **Live class Worker support and real citations remain unverified; this bonus should only be claimed after the final connection test succeeds.**

## 2. You controlled what the AI saw and how it responded using a system prompt. What did you learn about writing better prompts? Did you try any different versions? How did you make sure the AI stayed on topic and useful?

I learned that a useful prompt needs to explain the advisor’s role, the data it should rely on, and the kind of answer the user needs. A general instruction like “make a beauty routine” leaves too many details open. The finished system prompt identifies the assistant as a L’Oréal beauty advisor, supplies the selected products as JSON, and asks for numbered steps with exact product names, order, frequency, and morning or evening guidance. Optional skin type and goals make the request more personal without making those details mandatory.

I also learned that giving the model context is part of prompt writing. Each request includes the successful conversation history and a fresh system message containing the current selection. That lets follow-up questions refer to the routine while also making it clear when a user changes products. The prompt asks the advisor to stay within beauty and routine topics, redirect unrelated requests, avoid inventing products or claims, and ask for clarification when necessary. It also explains that not every selected product must be forced into the same routine.

I have not yet confirmed comparisons between different prompt versions against the live class Worker, so I would not claim that I ran those experiments. My next comparison would be a broad prompt versus this more specific prompt using the same selected products, followed by a question about product order and an unrelated question. I would check whether the response uses the correct products, explains a practical order, remembers the previous turn, and stays on topic.

## 3. Working with a mix of code, data, and AI often means things don’t work exactly how you expect. Describe a moment in this project when something didn’t go the way you thought it would—in the UI, the API response, or somewhere in between. What did you do to figure it out?

A concrete roadblock in the starter was the relationship between the category menu and the product data. The catalog contains products with the category `skincare`, including treatment products, but that category was missing from the original dropdown. A menu label that mentioned treatments did not automatically make those products match: the JavaScript compares the actual category values. Comparing the dropdown options with the categories in `products.json` showed why some products would be difficult to discover through the available filters. The finished menu includes a separate “Skincare & treatments” option with the exact value `skincare`, plus an “All categories” option.

This helped me see that debugging starts with the data the code actually uses. I applied the same idea to selections and conversation state. Saved selections store product IDs and reconnect them to the current catalog after a reload, rather than saving a second copy of every product. Chat requests keep the full successful history so a follow-up does not lose the routine’s context. The interface also handles catalog-loading errors, unavailable storage, failed requests, and missing citations with clear messages instead of claiming success.

The external connection is still a separate final check: the supplied materials did not include a working class Worker URL. I kept an explicit placeholder and documented how to replace it with the public class endpoint. That avoids confusing implemented frontend behavior with a confirmed live AI response. The lesson for me is to check each boundary—data, visible state, saved state, request payload, and service response—rather than assuming one successful step proves the whole application works.

## 4. Write a short LinkedIn post reflecting on what you learned while building your routine builder and chatbot.

I’ve been building a L’Oréal product-aware routine builder with HTML, CSS, and JavaScript. The project connects a real product catalog with an AI chat experience: users can filter products, save their selections, and request a routine tailored to their preferences.

The most useful lessons were keeping the interface in sync with application state, using `localStorage` for saved products, and sending conversation history so follow-up questions have context. I also added keyword search, accessible product descriptions, an RTL layout option, and citation rendering for an optional web-search mode.

My next milestone is connecting the class-hosted Cloudflare Worker and checking the live routine, follow-up answers, and web citations before publishing. This project has made the connection between product data, JavaScript, and prompt design much clearer to me.

Live project link to add after publication: https://33misha.github.io/09-prj-loreal-routine-builder/

#JavaScript #WebDevelopment #AI #LearningInPublic

---

## Before exporting the final submission

- Review the drafts so they accurately reflect your learning and contributions. Add any prompt comparisons or live testing you actually complete.
- Connect the real public class Worker URL as the final setup step; do not add an API key to this frontend.
- Verify live generation, contextual follow-ups, and actual search citations before marking them complete.
- Commit, push, publish to GitHub Pages, and test the published page in a private window.
- Replace the expected URL/status with the verified live URL and update the LevelUp list accordingly.
- Open `submission.html` and print to PDF, or copy these answers into the course document and export that completed document as PDF. Upload the completed PDF and live URL through HQ.

Posting the LinkedIn draft publicly is optional. This repository does not publish or submit it automatically.
