import { ContractTransaction, ethers } from 'ethers';

import Base from './base';
import { makeClaimWorkflowSBTCallData } from './make-call-data';

export default class SBT extends Base {
  constructor(provider?: ethers.providers.Provider | ethers.Signer, options?: { endpoint?: string }) {
    super(provider, options);
  }

  /**
   * Get SBT info
   * @param sbtAddress SBT contract address
   * @param tokenId token ID of the SBT
   * @returns Promise<Workflow>
   */
  async getInfo(sbtAddress: string, tokenId?: number) {
    return this.api.getSBTInfo(sbtAddress, tokenId);
  }

  async claim(workflow: string): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract('Factory');
    return factorySignerContract.callWorkflow(workflow, makeClaimWorkflowSBTCallData());
  }
}
