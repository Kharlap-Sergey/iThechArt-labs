export const trimText = (text, length, endChar) =>
  {
    if(!text) return "";
    return text.length > length ? text.slice(0, length) + endChar : text;
  }
