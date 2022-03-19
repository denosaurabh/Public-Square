export const cleanUrl = (url: string) => {
  if (!url) return url;
  return url.replace(/^https?:\/\//, "");
};
