export type FactoryEvents =
  | 'AddTask'
  | 'CallWorkflow'
  | 'CreateTaskTemplate'
  | 'CreateWorkflow'
  | 'CreateWorkflowTemplate'
  | 'EnableTask'
  | 'EnableWorkflowTemplate'
  | 'Initialized'
  | 'OwnershipTransferred'
  | 'RemoveTask'
  | 'SetDefaultTaskStatus'
  | 'SetDefaultWorkflowStatus'
  | 'SetFeeTo'
  | 'SetFeeToken'
  | 'SetRewardsFeeRate'
  | 'SetRewardsToken'
  | 'SetTemplateFeeRate'
  | 'Submit'
  | 'UpdateSBTBase'
  | 'UpdateTaskBase'
  | 'UpdateTaskFeeAmount'
  | 'UpdateTaskFeeReceiver'
  | 'UpdateWorkflowFeeAmount'
  | 'UpdateWorkflowFeeReceiver';

export type FactoryMethodNames =
  | 'ADDTASKS_SIGNATURE'
  | 'APPLYFOR_SIGNATURE'
  | 'REMOVETASKS_SIGNATURE'
  | 'SBTBase'
  | 'SUBMIT_SIGNATURE'
  | 'addTasks'
  | 'callWorkflow'
  | 'createTaskTemplate'
  | 'createWorkflow'
  | 'createWorkflowTemplate'
  | 'enableTask'
  | 'enableWorkflowTemplate'
  | 'getCurrentCaller'
  | 'getGlobalParams'
  | 'getTaskCounts'
  | 'getTaskInfo'
  | 'getWorkflowTemplateCounts'
  | 'getWorkflowTemplateInfo'
  | 'initialize'
  | 'isValidFeeToken'
  | 'isValidRewardsToken'
  | 'isValidWorkflow'
  | 'owner'
  | 'removeTasks'
  | 'renounceOwnership'
  | 'setDefaultTaskStatus'
  | 'setDefaultWorkflowStatus'
  | 'setFeeTo'
  | 'setFeeToken'
  | 'setRewardsFeeRate'
  | 'setRewardsToken'
  | 'setTemplateFeeRate'
  | 'submit'
  | 'transferOwnership'
  | 'updateSBTBase'
  | 'updateTaskBase'
  | 'updateTaskFeeAmount'
  | 'updateTaskFeeReceiver'
  | 'updateWorkflowFeeAmount'
  | 'updateWorkflowFeeReceiver';

export interface AddTaskEventEmittedResponse {
  workflow: string;
  internalIndex: string;
  externalIndex: string;
  taskAddress: string;
}
export interface ApplyForEventEmittedResponse {
  workflow: string;
  taker: string;
}
export interface CallWorkflowEventEmittedResponse {
  workflow: string;
  taker: string;
  data: string | number[];
}
export interface CreateTaskTemplateEventEmittedResponse {
  issuer: string;
  task: string;
  taskIndex: string;
  describe: string;
  enable: boolean;
}
export interface CreateWorkflowEventEmittedResponse {
  issuer: string;
  templateIndex: string;
  workflow: string;
  sbt: string;
}
export interface CreateWorkflowTemplateEventEmittedResponse {
  index: string;
  templateAddress: string;
  issuer: string;
  feeToken: string;
  feeReceiver: string;
  feeAmount: string;
  describe: string;
}
export interface EnableTaskEventEmittedResponse {
  index: string;
  enable: boolean;
}
export interface EnableWorkflowTemplateEventEmittedResponse {
  index: string;
  enable: boolean;
}
export interface InitializedEventEmittedResponse {
  version: string | number;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface RemoveTaskEventEmittedResponse {
  workflow: string;
  internalIndexes: string;
}
export interface SetDefaultTaskStatusEventEmittedResponse {
  originStatus: boolean;
  newStatus: boolean;
}
export interface SetDefaultWorkflowStatusEventEmittedResponse {
  originStatus: boolean;
  newStatus: boolean;
}
export interface SetFeeToEventEmittedResponse {
  originFeeTo: string;
  newFeeTo: string;
}
export interface SetFeeTokenEventEmittedResponse {
  token: string;
  enable: boolean;
}
export interface SetRewardsFeeRateEventEmittedResponse {
  originRate: string;
  newRate: string;
}
export interface SetRewardsTokenEventEmittedResponse {
  token: string;
  enable: boolean;
}
export interface SetTemplateFeeRateEventEmittedResponse {
  originRate: string;
  newRate: string;
}
export interface SubmitEventEmittedResponse {
  workflow: string;
  taker: string;
  index: string;
  content: string;
  taskFee: string;
}
export interface UpdateSBTBaseEventEmittedResponse {
  originSBTBase: string;
  newSBTBase: string;
}
export interface UpdateTaskBaseEventEmittedResponse {
  originTaskBase: string;
  newTaskBase: string;
}
export interface UpdateTaskFeeAmountEventEmittedResponse {
  taskIndex: string;
  newFeeAmount: string;
}
export interface UpdateTaskFeeReceiverEventEmittedResponse {
  taskIndex: string;
  newFeeReceiver: string;
}
export interface UpdateWorkflowFeeAmountEventEmittedResponse {
  taskIndex: string;
  newFeeAmount: string;
}
export interface UpdateWorkflowFeeReceiverEventEmittedResponse {
  taskIndex: string;
  newFeeReceiver: string;
}
export interface CreateWorkflowRequest {
  name: string;
  symbol: string;
  defaultURI: string;
}
export interface GpResponse {
  defaultTaskStatus: boolean;
  defaultWorkflowStatus: boolean;
  sbtBase: string;
  taskBase: string;
  feeTo: string;
  templateFeeRate: string;
  rewardsFeeRate: string;
  feePrecision: string;
}
export interface InfoResponse {
  id: string;
  template: string;
  issuer: string;
  feeToken: string;
  feeReceiver: string;
  feeAmount: string;
  feeReceived: string;
  useCounts: string;
  describe: string;
  enable: boolean;
}

export interface Factory {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  ADDTASKS_SIGNATURE(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  APPLYFOR_SIGNATURE(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  REMOVETASKS_SIGNATURE(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  SBTBase(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  SUBMIT_SIGNATURE(): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param workflow Type: address, Indexed: false
   * @param taskData Type: bytes[], Indexed: false
   */
  addTasks(workflow: string, taskData: string | number[][]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param workflow Type: address, Indexed: false
   */
  applyFor(workflow: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param workflow Type: address, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  callWorkflow(workflow: string, data: string | number[]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param feeAmount Type: uint256, Indexed: false
   * @param feeToken Type: address, Indexed: false
   * @param feeReceiver Type: address, Indexed: false
   * @param describe Type: string, Indexed: false
   */
  createTaskTemplate(
    feeAmount: string,
    feeToken: string,
    feeReceiver: string,
    describe: string,
  ): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param templateIndex Type: uint256, Indexed: false
   * @param sp Type: tuple, Indexed: false
   * @param workflowData Type: bytes, Indexed: false
   * @param taskData Type: bytes[], Indexed: false
   */
  createWorkflow(
    templateIndex: string,
    sp: CreateWorkflowRequest,
    workflowData: string | number[],
    taskData: string | number[][],
  ): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param templateAddress Type: address, Indexed: false
   * @param feeAmount Type: uint256, Indexed: false
   * @param feeToken Type: address, Indexed: false
   * @param feeReceiver Type: address, Indexed: false
   * @param describe Type: string, Indexed: false
   */
  createWorkflowTemplate(
    templateAddress: string,
    feeAmount: string,
    feeToken: string,
    feeReceiver: string,
    describe: string,
  ): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param index Type: uint256, Indexed: false
   * @param enable Type: bool, Indexed: false
   */
  enableTask(index: string, enable: boolean): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param index Type: uint256, Indexed: false
   * @param enable Type: bool, Indexed: false
   */
  enableWorkflowTemplate(index: string, enable: boolean): Promise<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentCaller(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getGlobalParams(): Promise<GpResponse>;
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
   */
  getWorkflowTemplateCounts(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  getWorkflowTemplateInfo(index: string): Promise<InfoResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sbtBase Type: address, Indexed: false
   * @param taskBase Type: address, Indexed: false
   * @param feeTo Type: address, Indexed: false
   */
  initialize(sbtBase: string, taskBase: string, feeTo: string): Promise<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  isValidFeeToken(parameter0: string): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  isValidRewardsToken(parameter0: string): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  isValidWorkflow(parameter0: string): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param workflow Type: address, Indexed: false
   * @param indexes Type: uint256[], Indexed: false
   */
  removeTasks(workflow: string, indexes: string[]): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newStatus Type: bool, Indexed: false
   */
  setDefaultTaskStatus(newStatus: boolean): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newStatus Type: bool, Indexed: false
   */
  setDefaultWorkflowStatus(newStatus: boolean): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newFeeTo Type: address, Indexed: false
   */
  setFeeTo(newFeeTo: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param enable Type: bool, Indexed: false
   */
  setFeeToken(token: string, enable: boolean): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newRewardsFeeRate Type: uint256, Indexed: false
   */
  setRewardsFeeRate(newRewardsFeeRate: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenAddress Type: address, Indexed: false
   * @param enable Type: bool, Indexed: false
   */
  setRewardsToken(tokenAddress: string, enable: boolean): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newTemplateFeeRate Type: uint256, Indexed: false
   */
  setTemplateFeeRate(newTemplateFeeRate: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param workflow Type: address, Indexed: false
   * @param index Type: uint256, Indexed: false
   * @param content Type: string, Indexed: false
   */
  submit(workflow: string, index: string, content: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newSBTBase Type: address, Indexed: false
   */
  updateSBTBase(newSBTBase: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newTaskBase Type: address, Indexed: false
   */
  updateTaskBase(newTaskBase: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param index Type: uint256, Indexed: false
   * @param newFeeAmount Type: uint256, Indexed: false
   */
  updateTaskFeeAmount(index: string, newFeeAmount: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param index Type: uint256, Indexed: false
   * @param newFeeReceiver Type: address, Indexed: false
   */
  updateTaskFeeReceiver(index: string, newFeeReceiver: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param index Type: uint256, Indexed: false
   * @param newFeeAmount Type: uint256, Indexed: false
   */
  updateWorkflowFeeAmount(index: string, newFeeAmount: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param index Type: uint256, Indexed: false
   * @param newFeeReceiver Type: address, Indexed: false
   */
  updateWorkflowFeeReceiver(index: string, newFeeReceiver: string): Promise<void>;
}
