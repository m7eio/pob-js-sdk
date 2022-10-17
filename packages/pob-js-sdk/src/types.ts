import { ethers } from "ethers";

export interface WorkflowTemplate {
  template: string;
  issuer: string;
  feeToken: string;
  feeReceiver: string;
  feeAmount: ethers.BigNumber;
  description: string;
  enable: boolean;
}
