import { AnySchema } from "ajv";
import fetch from "isomorphic-fetch";

export async function getJSONFromIPFS<R>(hash: string): Promise<R> {
  const response = await fetch(`https://ipfs.particle.network/${hash}`, {
    redirect: "follow",
  });

  const data = await response.json();
  return data;
}

export async function saveJSONToIPFS(data: AnySchema): Promise<{
  cid: string;
  url: string;
  urls: string[];
}> {
  const username = "e7c467ee-426e-42fd-ae54-c574b5515068";
  const password = "s1O5gddRKVNXlx5W1l0kjy7XWIkD1zzlf6uRAwxu";

  const res = await fetch("https://rpc.particle.network/ipfs/upload_json", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        "base64"
      )}`,
      "Content-Type": "application/json",
    },
  });

  const resData = await res.json();
  console.log("[POB Core]: saveJSONToIPFS", resData);
  return resData;
}

export async function uploadFileToIPFS(file: File): Promise<{
  // v1 cid: @see https://docs.ipfs.io/concepts/content-addressing/#identifier-formats
  cid: string;
  // Preferred url
  url: string;
  // Other working urls: @see https://ipfs.github.io/public-gateway-checker/
  urls: string[];
}> {
  const username = "e7c467ee-426e-42fd-ae54-c574b5515068";
  const password = "s1O5gddRKVNXlx5W1l0kjy7XWIkD1zzlf6uRAwxu";

  const payload = new FormData();
  payload.append("file", file);

  const res = await fetch("https://rpc.particle.network/ipfs/upload", {
    method: "POST",
    body: payload,
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        "base64"
      )}`,
    },
  });

  const resData = await res.json();

  return resData;
}
