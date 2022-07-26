import { AnySchema } from 'ajv';
import fetch from 'isomorphic-fetch';
import promiseAny from 'promise.any';

const IPFS_ENDPOINTS = [
  'https://ipfs.nftstorage.link',
  'https://ipfs.fleek.co',
  // 'https://gateway.pinata.cloud',
];

export async function getIPFS<R>(hash: string): Promise<R> {
  console.warn(
    '[Deprecated]: This method(getIPFS) will be deprecated, please use getJSONFromIPFS!',
  );
  const res = await fetch(`https://ipfs.nftstorage.link/ipfs/${hash}`);
  return res.json();
}

export async function getJSONFromIPFS<R>(hash: string): Promise<R> {
  const response = await promiseAny(
    IPFS_ENDPOINTS.map((endpoint) => fetch(`${endpoint}/ipfs/${hash}`)),
  );

  const data = await response.json();
  return data;
}

export async function saveToIPFS(data: AnySchema): Promise<string> {
  console.warn(
    '[Deprecated]: This method(saveToIPFS) will be deprecated, please use saveJSONToIPFS!',
  );
  const res = await fetch('https://alpha.pob.work/api/v1/ipfs', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  });

  const resData = await res.json();

  return resData.data.cid;
}

export async function saveJSONToIPFS(data: AnySchema): Promise<string> {
  const res = await fetch('https://alpha.pob.work/api/v1/ipfs', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  });

  const resData = await res.json();

  return resData.data.cid;
}

export async function uploadFileToIPFS(file: File): Promise<{
  // v1 cid: @see https://docs.ipfs.io/concepts/content-addressing/#identifier-formats
  cid: string;
  // Preferred url
  url: string;
  // Other working urls: @see https://ipfs.github.io/public-gateway-checker/
  urls: string[];
}> {
  const username = 'e7c467ee-426e-42fd-ae54-c574b5515068';
  const password = 's1O5gddRKVNXlx5W1l0kjy7XWIkD1zzlf6uRAwxu';

  const payload = new FormData();
  payload.append('file', file);

  const res = await fetch('https://api.particle.network/ipfs/upload', {
    method: 'POST',
    body: payload,
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
    },
  });

  const resData = await res.json();

  return resData;
}
