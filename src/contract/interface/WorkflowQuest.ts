import { ContractTransaction } from 'ethers';

export type WorkflowQuestEvents =
  | 'AddTask'
  | 'ApplyFor'
  | 'ApproveTask'
  | 'ApproveWorkflow'
  | 'BoundSBT'
  | 'Claim'
  | 'RejectTask'
  | 'RemoveTask'
  | 'SetMerkleRoot'
  | 'SubmitInWorkflow';

export type WorkflowQuestMethodNames =
  | 'addTasks'
  | 'applyFor'
  | 'approveTask'
  | 'approveWorkflow'
  | 'approveWorkflowAndMintNFT'
  | 'approveWorkflowByMerkleRoot'
  | 'boundSBT'
  | 'claim'
  | 'claimByMerkleProof'
  | 'endWorkflow'
  | 'getAddedTasks'
  | 'getTaskCounts'
  | 'getTaskInfo'
  | 'getTaskWinnersInfo'
  | 'getWorkflowInfo'
  | 'getWorkflowIssuer'
  | 'initialize'
  | 'rejectTask'
  | 'removeTasks'
  | 'setTokenURI'
  | 'submit'
  | 'takerTaskStatus'
  | 'takerWorkflowStatus'
  | 'workflowCompleted';
export interface AddTaskEventEmittedResponse {
  taskIndex: string;
  taskAddress: string;
  deadline: string;
  rewards: string;
  feeAmount: string;
  onlyOneWinner: boolean;
  describe: string;
}
export interface ApplyForEventEmittedResponse {
  taker: string;
}
export interface ApproveTaskEventEmittedResponse {
  index: string;
  taker: string;
  rewards: string;
}
export interface ApproveWorkflowEventEmittedResponse {
  taker: string;
}
export interface BoundSBTEventEmittedResponse {
  sbtAddress: string;
}
export interface ClaimEventEmittedResponse {
  taker: string;
  tokenId: string;
}
export interface RejectTaskEventEmittedResponse {
  index: string;
  taker: string;
}
export interface RemoveTaskEventEmittedResponse {
  index: string;
  taskAddress: string;
}
export interface SetMerkleRootEventEmittedResponse {
  merkleRoot: string | number[];
}
export interface SubmitInWorkflowEventEmittedResponse {
  taker: string;
  index: string;
  content: string;
  describe: string;
  submitId: string;
}
export interface AddtaskinfoResponse {
  internalIndex: string;
  externalIndex: string;
  totalRewards: string;
  taskAddress: string;
}
export interface InfoResponse {
  onlyOneWinner: boolean;
  taskAddress: string;
  reviewer: string;
  taskIndex: string;
  totalRewards: string;
  remainingRewards: string;
  feeAmount: string;
  deadline: string;
  describe: string;
}
export interface WinnerinfoResponse {
  winner: string;
  reweards: string;
}
export interface WorkflowinfoResponse {
  inOrder: boolean;
  workflowEnded: boolean;
  describe: string;
  minimumTasks: string;
  totalRewards: string;
  applicantCounts: string;
  startTime: string;
  endTime: string;
  withdrawTime: string;
  reviewer: string;
  feeReceiver: string;
  issuer: string;
  factory: string;
  rewardsToken: string;
  feeToken: string;
  sbtAddress: string;
  merkleRoot: string;
}
export interface TakerTaskStatusResponse {
  status: string;
  rewards: string;
}
export interface TakerWorkflowStatusResponse {
  status: string;
  tokenId: string;
  claimed: boolean;
}
export interface WorkflowQuest {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param TaskParamsBytesList Type: bytes[], Indexed: false
   */
  addTasks(TaskParamsBytesList: string | number[][]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  applyFor(): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param index Type: uint256, Indexed: false
   * @param taker Type: address, Indexed: false
   * @param rewards Type: uint256, Indexed: false
   */
  approveTask(index: string, taker: string, rewards: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param takers Type: address[], Indexed: false
   */
  approveWorkflow(takers: string[]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param takers Type: address[], Indexed: false
   * @param uris Type: string[], Indexed: false
   */
  approveWorkflowAndMintNFT(takers: string[], uris: string[]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _merkleRoot Type: bytes32, Indexed: false
   */
  approveWorkflowByMerkleRoot(_merkleRoot: string | number[]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sbtAddress Type: address, Indexed: false
   */
  boundSBT(sbtAddress: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  claim(): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param proof Type: bytes32[], Indexed: false
   */
  claimByMerkleProof(proof: string | number[][]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  endWorkflow(): Promise<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAddedTasks(): Promise<AddtaskinfoResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getTaskCounts(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  getTaskInfo(index: string): Promise<InfoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  getTaskWinnersInfo(index: string): Promise<WinnerinfoResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getWorkflowInfo(): Promise<WorkflowinfoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getWorkflowIssuer(): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param workflowParamsBytes Type: bytes, Indexed: false
   */
  initialize(workflowParamsBytes: string | number[]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param taskIndex Type: uint256, Indexed: false
   * @param taker Type: address, Indexed: false
   */
  rejectTask(taskIndex: string, taker: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param indexes Type: uint256[], Indexed: false
   */
  removeTasks(indexes: string[]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenIds Type: uint256[], Indexed: false
   * @param uris Type: string[], Indexed: false
   */
  setTokenURI(tokenIds: string[], uris: string[]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param index Type: uint256, Indexed: false
   * @param content Type: string, Indexed: false
   */
  submit(index: string, content: string): Promise<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  takerTaskStatus(parameter0: string, parameter1: string): Promise<TakerTaskStatusResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  takerWorkflowStatus(parameter0: string): Promise<TakerWorkflowStatusResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param taker Type: address, Indexed: false
   */
  workflowCompleted(taker: string): Promise<boolean>;
}
