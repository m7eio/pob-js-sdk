export interface CommonTaskRequest {
  onlyOneWinner: boolean;
  taskIndex: number;
  reviewer: string;
  totalRewards?: string;
  feeAmount?: string;
  deadline: number;
  describe: any;
}

export interface TaskStatus {
  workflow: string;
  taker: string;
  reviewer: string;
  taskIndex: number;
  status: string;
  content: string;
  transactionHash: string;
  logIndex: string;
  blockHash: string;
  transactionIndex: string;
  createdAt: number;
  updatedAt: number;
}

export interface TaskLogResponse {
  workflow: string;
  taskIndex: number;
  issuer: string;
  taker: string;
  reviewer: string;
  action: string;
  content: string;
  taskFee: string;
  createdAt: number;
  updatedAt: number;
}
