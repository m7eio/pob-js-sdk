export type SBTBaseEvents = 'Approval' | 'ApprovalForAll' | 'Initialized' | 'SetURI' | 'Transfer';

export type SBTBaseMethodNames =
  | 'approve'
  | 'balanceOf'
  | 'defaultURI'
  | 'getApproved'
  | 'initialize'
  | 'isApprovedForAll'
  | 'name'
  | 'ownerOf'
  | 'safeMint'
  | 'safeTransferFrom'
  | 'safeTransferFrom'
  | 'setApprovalForAll'
  | 'setTokenURI'
  | 'supportsInterface'
  | 'symbol'
  | 'tokenURI'
  | 'transferFrom'
  | 'workflow';
export interface ApprovalEventEmittedResponse {
  owner: string;
  approved: string;
  tokenId: string;
}
export interface ApprovalForAllEventEmittedResponse {
  owner: string;
  operator: string;
  approved: boolean;
}
export interface InitializedEventEmittedResponse {
  version: string | number;
}
export interface SetURIEventEmittedResponse {
  tokenId: string;
  uri: string;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  tokenId: string;
}
export interface SBTBase {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  approve(to: string, tokenId: string): Promise<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  balanceOf(owner: string): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  defaultURI(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getApproved(tokenId: string): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param workflow_ Type: address, Indexed: false
   * @param name_ Type: string, Indexed: false
   * @param symbol_ Type: string, Indexed: false
   * @param defaultURI_ Type: string, Indexed: false
   */
  initialize(workflow_: string, name_: string, symbol_: string, defaultURI_: string): Promise<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   */
  isApprovedForAll(owner: string, operator: string): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  ownerOf(tokenId: string): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  safeMint(account: string, tokenId: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  safeTransferFrom(from: string, to: string, tokenId: string): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: string,
    _data: string | number[],
  ): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setApprovalForAll(operator: string, approved: boolean): Promise<void>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   * @param uri Type: string, Indexed: false
   */
  setTokenURI(tokenId: string, uri: string): Promise<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(interfaceId: string | number[]): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenURI(tokenId: string): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  transferFrom(from: string, to: string, tokenId: string): Promise<void>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  workflow(): Promise<string>;
}
