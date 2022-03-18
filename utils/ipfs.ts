import { create as IPFSHTTPClient } from "ipfs-http-client";

export const IPFSClient = IPFSHTTPClient({
  apiPath: "/api/v0",
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
