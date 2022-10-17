import { CommonTransactionResponse, TokenValue } from "../common";

export interface CommonTaskRequest {
  onlyOneWinner: boolean;
  taskIndex: number;
  reviewer: string;
  totalRewards?: string;
  feeAmount?: string;
  deadline: number;
  describe: any;
}

export interface TaskStatus extends CommonTransactionResponse {
  workflow: string;
  taker: string;
  reviewer: string;
  taskIndex: number;
  status: string;
  content: string;
  rewards: TokenValue;
  taskFee: TokenValue;
  transactionHash: string;
  logIndex: string;
  blockHash: string;
  transactionIndex: string;
  createdAt: number;
  updatedAt: number;
}

export interface TaskLogResponse extends CommonTransactionResponse {
  workflow: string;
  taskIndex: number;
  issuer: string;
  taker: string;
  reviewer: string;
  action: string;
  content: string;
  rewards: TokenValue;
  taskFee: TokenValue;
  createdAt: number;
  updatedAt: number;
}
