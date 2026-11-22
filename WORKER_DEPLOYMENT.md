# Finish the live web-search bonus

The working frontend already calls the public Worker. The remaining step is deploying the corrected **server code** in [cloudflare-worker.txt](cloudflare-worker.txt) to the existing `loreal-chatbot` Worker.

This file contains no API key. It reads the existing `OPENAI_API_KEY` secret binding inside Cloudflare. Its module entry point is for Cloudflare only; the file is not linked from `index.html`.

The replacement passed **11 offline server checks** with a simulated upstream service. The frontend also passed **24 browser regression checks**, including the `reply`/`citations` response format. These checks do not establish live search availability; that requires deploying the Worker and checking real sources.

## Use your Cloudflare-connected agent

Copy this instruction into the Cloudflare agent that has access to your account:

> Deploy the complete module from https://raw.githubusercontent.com/33misha/09-prj-loreal-routine-builder/main/cloudflare-worker.txt to my existing loreal-chatbot Worker. Use its existing OPENAI_API_KEY secret binding and preserve the current workers.dev address. This code defaults to gpt-4.1, omits temperature for gpt-5-search-api, forwards web_search_options, and preserves the standard choices response including real citation annotations, plus the legacy reply field. Confirm deployment by checking that GET https://loreal-chatbot.kosulinma.workers.dev/ returns version routine-search-v1. Do not print or return the secret value.

## Or use the Cloudflare dashboard

1. Open **Workers & Pages → loreal-chatbot → Edit code**.
2. Copy the entire contents of `cloudflare-worker.txt` into the existing Worker editor.
3. Select **Deploy**. Keep the existing `OPENAI_API_KEY` secret binding; no key value needs to be copied anywhere.
4. Open [the Worker health check](https://loreal-chatbot.kosulinma.workers.dev/). The JSON should include `"version": "routine-search-v1"`.
5. Return to this chat after deployment so the live search model, returned citations, and final rubric result can be checked.

## What still needs live verification

The current deployed Worker rejects search requests with HTTP 400 because it sends `temperature`. The replacement has been prepared separately; writing this file does not deploy it.

After deployment, enable **Search the web for current information** on the [live website](https://33misha.github.io/09-prj-loreal-routine-builder/), ask a current product question, and confirm a relevant answer appears with clickable **Web sources**. The 10-point web-search bonus stays unclaimed until the real endpoint passes that check.

See the [official OpenAI web-search guide](https://developers.openai.com/api/docs/guides/tools-web-search) for the search-model request and citation format.
