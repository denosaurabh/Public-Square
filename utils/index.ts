export const cleanUrl = (url: string) => {
  if (!url) return url;
  return url.replace(/^https?:\/\//, "");
};

export const smallAddress = (address: string) => {
  if (!address) return address;

  const smallAddress = [
    address.slice(0, 4),
    "..",
    address.slice(address.length - 4, address.length),
  ].join("");

  return smallAddress;
};
