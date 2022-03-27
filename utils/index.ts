import { LensHub__factory } from "@/typechain-types";
import { ethers } from "ethers";

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

export const decodeTxEncodedData = (data: string) => {
  const lensHubI = new ethers.utils.Interface(LensHub__factory.abi);

  try {
    const decodedData = lensHubI.decodeFunctionData("post", data);

    let filteredDecodedData: Record<string, any> = {};

    Object.entries(decodedData.vars).map((key: any, i: number, arr) => {
      if (Number(key[0]) || key[0] == 0) {
        return null;
      }

      filteredDecodedData[`${key[0]}`] = key[1];
    });

    console.log(filteredDecodedData);

    const profileInt = filteredDecodedData?.profileId?._hex;
    filteredDecodedData?.profileId = profileInt;

    filteredDecodedData.type = "POST";

    return filteredDecodedData;
  } catch (err) {
    console.log("decodeTxEncodedData", err);

    return {
      message: "Couldn't determine the data!",
      error: err,
    };
  }
};

export const compareAddress = (
  a: string | undefined,
  b: string | undefined
): boolean => {
  return !!a && !!b && a.toLowerCase() === b.toLowerCase();
};

export const sliceIntoChunks = (arr: any[], chunkSize: number) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

export const chunkify = (a: any[], n: number, balanced: boolean) => {
  if (n < 2) return [a];

  var len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }

  return out;
};

export const getIPFSUrlCID = (ipfsUrl: string) => {
  if (!ipfsUrl) return;

  const ipfsUrlParts = ipfsUrl?.replace("ipfs://", "")?.replace("/", "");

  return ipfsUrlParts;
};
