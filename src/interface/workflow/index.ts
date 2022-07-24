export interface WorkflowResponse {
  templateIndex: string;
  workflowEnded: boolean;
  applicantCounts: number;
  feeReceiver: string;
  feeToken: string;
  issuer: string;
  workflow: string;
  describe: string;
  inOrder: boolean;
  minimumTasks: number;
  startTime: number;
  endTime: number;
  reviewer: string;
  rewardsToken: string;
  totalRewards: string;
  sbtAddress: string;
  merkleRoot: string;
  decimals: number;
  name: string;
  description: string;
  namespace: string;
  status: string;
  transactionHash: string;
  logIndex: string;
  blockHash: string;
  transactionIndex: string;
  createdAt: number;
  updatedAt: number;
}

export interface TaskResponse {
  workflow: string;
  taskIndex: number;
  taskAddress: string;
  templateIndex: number;
  onlyOneWinner: boolean;
  reviewer: string;
  totalRewards: string;
  remainingRewards: string;
  feeAmount: string;
  decimals: number;
  deadline: number;
  describe: string;
  name: string;
  description: string;
  transactionHash: string;
  logIndex: string;
  blockHash: string;
  transactionIndex: string;
  createdAt: number;
  updatedAt: number;
  extInfo: {
    [key: string]: any;
  };
}

export interface WorkflowTakerStatus {
  workflow: string;
  taker: string;
  reviewer: string;
  status: string;
  transactionHash: string;
  logIndex: string;
  blockHash: string;
  transactionIndex: string;
  createdAt: number;
  updatedAt: number;
}

export interface WorkflowLogResponse {
  workflow: string;
  issuer: string;
  taker: string;
  reviewer: string;
  action: string;
  workflowInfo: WorkflowResponse;
  createdAt: number;
  updatedAt: number;
}
