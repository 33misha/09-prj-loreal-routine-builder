/*
 * Render the assistant's text and real web-search citations safely.
 * AI text is untrusted: create DOM nodes instead of inserting it as HTML.
 */

// Accept web links only. A javascript: or data: URL must never become clickable.
function safeSourceUrl(value) {
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return "";
    if (url.username || url.password) return "";
    return url.href;
  } catch {
    return "";
  }
}

// Search-enabled Chat Completions puts verified citation metadata on the message.
// Normal model-generated links are not counted as web-search citations.
function getResponseSources(message) {
  const sources = [];
  const annotations = Array.isArray(message?.annotations)
    ? message.annotations
    : [];

  annotations.forEach((annotation) => {
    if (annotation?.type !== "url_citation") return;
    const citation = annotation.url_citation;
    const url = safeSourceUrl(citation?.url);
    if (!url || sources.some((source) => source.url === url)) return;

    sources.push({
      title: typeof citation.title === "string" && citation.title.trim()
        ? citation.title.trim()
        : new URL(url).hostname,
      url,
    });
  });

  return sources;
}

// Links open separately without giving the destination access to this page.
function createSourceLink(label, url) {
  const link = document.createElement("a");
  link.textContent = label;
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

function appendAssistantContent(container, content, sources = []) {
  // Keep line breaks readable; support simple bold text and ordinary web links.
  // This deliberately small formatter avoids a dependency or an HTML parser.
  const text = String(content);
  const tokens = /\[([^\]\n]+)\]\((https?:\/\/[^\s]+?)\)|\*\*([^*\n]+)\*\*|(https?:\/\/[^\s<>"']+)/g;
  let previousEnd = 0;

  for (const match of text.matchAll(tokens)) {
    container.append(document.createTextNode(text.slice(previousEnd, match.index)));

    if (match[3]) {
      const bold = document.createElement("strong");
      bold.textContent = match[3];
      container.append(bold);
    } else {
      // Sentence punctuation is not part of a plain URL.
      const rawUrl = match[2] || match[4];
      const cleanUrl = match[4] ? rawUrl.replace(/[.,;!?]+$/, "") : rawUrl;
      const url = safeSourceUrl(cleanUrl);
      if (url) {
        container.append(createSourceLink(match[1] || cleanUrl, url));
        if (match[4]) {
          container.append(document.createTextNode(rawUrl.slice(cleanUrl.length)));
        }
      } else {
        container.append(document.createTextNode(match[0]));
      }
    }

    previousEnd = match.index + match[0].length;
  }

  container.append(document.createTextNode(text.slice(previousEnd)));

  // Always display the actual returned citations, even if the prose has no links.
  const validSources = sources.filter((source) => safeSourceUrl(source.url));
  if (!validSources.length) return;

  const sourceSection = document.createElement("div");
  sourceSection.className = "sources";
  const heading = document.createElement("p");
  heading.textContent = "Web sources";
  const list = document.createElement("ol");
  list.className = "source-list";

  validSources.forEach((source) => {
    const item = document.createElement("li");
    item.append(createSourceLink(source.title, safeSourceUrl(source.url)));
    list.append(item);
  });

  sourceSection.append(heading, list);
  container.append(sourceSection);
}
