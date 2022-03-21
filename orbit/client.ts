import { IPFSClient } from "@/utils/ipfs";
import OrbitDB from "orbit-db";

const orbitdb = new OrbitDB(IPFSClient);
const db = await orbitdb.log("hello");
