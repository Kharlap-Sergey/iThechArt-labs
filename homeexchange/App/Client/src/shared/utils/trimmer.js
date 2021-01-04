export const trimText = (text, length, endChar) =>
  text.length > length ? text.slice(0, length) + endChar : text;
