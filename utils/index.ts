export const cleanUrl = (url: string) => {
  if (!url) return url;
  return url.replace(/^https?:\/\//, "");
};

export const smallAddress = (address: string, cutBy?: number) => {
  if (!address) return address;

  const smallAddress = [
    address.slice(0, cutBy || 4),
    "...",
    address.slice(address.length - (cutBy || 4), address.length),
  ].join("");

  return smallAddress;
};

export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
