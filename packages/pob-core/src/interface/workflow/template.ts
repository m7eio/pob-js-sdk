export interface QuestWorkflowRequest {
  inOrder: boolean;
  minimumTasks: number;
  startTime: number;
  withdrawTime?: number;
  endTime?: number;
  reviewer: string;
  feeReceiver?: string;
  rewardsToken?: string;
  feeToken?: string;
  describe: any;
}

export interface WorkflowTemplateaResponse {
  workflowIndex: number;
  feeToken: string;
  feeReceiver: string;
  enable: boolean;
  feeAmount: string;
  issuer: string;
  feeReceived: string;
  useCounts: number;
  tags: string[];
  transactionHash: string;
  logIndex: string;
  blockHash: string;
  transactionIndex: string;
  createdAt: number;
  updatedAt: number;
}
