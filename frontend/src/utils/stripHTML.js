export const stripHTML = (html, limit = 120) => {
  if (!html) return "";

  const doc = new DOMParser().parseFromString(html, "text/html");

  //  Extract text
  let text = doc.body.textContent || "";

  // 🪄 Normalize weird spacing caused by tags like <br>, <h1>
  text = text.replace(/\s+/g, " ").trim();

  //  Apply max length
  if (limit && text.length > limit) {
    text = text.slice(0, limit).trim() + "...";
  }

  return text;
};