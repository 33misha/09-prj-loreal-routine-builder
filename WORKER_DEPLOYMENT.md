# Worker deployment and verification

The corrected server code is deployed to the existing `loreal-chatbot` Worker. Its public health check confirms version `routine-search-v1`. Ten live production search checks passed, including the confirmed search model, real citations, and a visible official CeraVe source. Standard routine generation and follow-up chat were rechecked after deployment and passed all eight production chat checks.

This file contains no API key. It reads the existing `OPENAI_API_KEY` secret binding inside Cloudflare. Its module entry point is for Cloudflare only; the file is not linked from `index.html`.

The server source is documented in [cloudflare-worker.txt](cloudflare-worker.txt). It also passed **11 offline server checks** with a simulated upstream service. The frontend passed **24 browser regression checks**, including the `reply`/`citations` response format. The deployment instructions below are retained for future maintenance; the current deployment and live search have already been verified.

## Future deployment with your Cloudflare-connected agent

Copy this instruction into the Cloudflare agent that has access to your account:

> Deploy the complete module from https://raw.githubusercontent.com/33misha/09-prj-loreal-routine-builder/main/cloudflare-worker.txt to my existing loreal-chatbot Worker. Use its existing OPENAI_API_KEY secret binding and preserve the current workers.dev address. This code defaults to gpt-4.1, omits temperature for gpt-5-search-api, forwards web_search_options, and preserves the standard choices response including real citation annotations, plus the legacy reply field. Confirm deployment by checking that GET https://loreal-chatbot.kosulinma.workers.dev/ returns version routine-search-v1. Do not print or return the secret value.

## Future deployment through the Cloudflare dashboard

1. Open **Workers & Pages → loreal-chatbot → Edit code**.
2. Copy the entire contents of `cloudflare-worker.txt` into the existing Worker editor.
3. Select **Deploy**. Keep the existing `OPENAI_API_KEY` secret binding; no key value needs to be copied anywhere.
4. Open [the Worker health check](https://loreal-chatbot.kosulinma.workers.dev/). The JSON should include `"version": "routine-search-v1"`.
5. After a future deployment, repeat the production chat and search checks to confirm the updated service still works.

## Verification after future deployments

The previous search failure was caused by forwarding an unsupported `temperature` parameter. The deployed version omits that setting for search requests, forwards search options, and preserves citation metadata.

After any future deployment, enable **Search the web for current information** on the [live website](https://33misha.github.io/09-prj-loreal-routine-builder/), ask a current product question, and confirm a relevant answer appears with clickable **Web sources**. This check passed against the current production deployment; the live web-search bonus is now supported by actual response and browser evidence.

See the [official OpenAI web-search guide](https://developers.openai.com/api/docs/guides/tools-web-search) for the search-model request and citation format.
