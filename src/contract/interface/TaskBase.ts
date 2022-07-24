export type TaskBaseEvents = 'Register' | 'Submit';

export type TaskBaseMethodNames =
  | 'describe'
  | 'factory'
  | 'getSubmitRecords'
  | 'initialize'
  | 'register'
  | 'registeredWorkflow'
  | 'resultId'
  | 'submit';
export interface RegisterEventEmittedResponse {
  workflow: string;
}
export interface SubmitEventEmittedResponse {
  workflow: string;
  taker: string;
  submitId: string;
  content: string;
  describe: string;
}
export interface RecordsResponse {
  id: string;
  submitter: string;
  workflow: string;
  submitTime: string;
  content: string;
}
export interface TaskBase {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  describe(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  factory(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param workflow Type: address, Indexed: false
   * @param taker Type: address, Indexed: false
   */
  getSubmitRecords(workflow: string, taker: string): Promise<RecordsResponse[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param factory_ Type: address, Indexed: false
   * @param describe_ Type: string, Indexed: false
   */
  initialize(factory_: string, describe_: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param workflow Type: address, Indexed: false
   */
  register(workflow: string): Promise<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  registeredWorkflow(parameter0: string): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  resultId(): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param taker Type: address, Indexed: false
   * @param content Type: string, Indexed: false
   * @param describeDetail Type: string, Indexed: false
   */
  submit(taker: string, content: string, describeDetail: string): Promise<void>;
}
