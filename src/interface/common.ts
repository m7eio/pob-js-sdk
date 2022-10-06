import { ethers } from 'ethers';
import { CommonTaskRequest } from "./task";
import { QuestWorkflowRequest } from "./workflow/template";

import contractList from "../contract/contract-list";

export interface WorkflowTemplateRequest {
  0: QuestWorkflowRequest;
  1: QuestWorkflowRequest;
  [key: number]: QuestWorkflowRequest;
}

export interface TaskRequest {
  "task address": CommonTaskRequest;
}

export interface Rewards {
  token: string;
  amount: string;
}

export interface SBTParams {
  name: string;
  symbol: string;
  image?: string;
  defaultURI?: string;
  [key: string]: any;
}

export type ChianIdList = keyof typeof contractList;

export interface Response<T> {
  status: "success" | "fail";
  msg: string;
  data: T;
}

export interface PaginateResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page?: number | undefined;
  totalPages: number;
  offset: number;
  prevPage?: number | null | undefined;
  nextPage?: number | null | undefined;
  pagingCounter: number;
  meta?: any;
  [customLabel: string]: T[] | number | boolean | null | undefined;
}

export interface TokenValue {
  value: string;
  decimals: number;
}

export interface CommonTransactionResponse {
  transactionHash: string;
  logIndex: string;
  blockHash: string;
  transactionIndex: string;
}

export interface Overrides {
  gasLimit?: ethers.BigNumber;
  gasPrice?: ethers.BigNumber;
  value?: ethers.BigNumber;
  nonce?: number;
}
