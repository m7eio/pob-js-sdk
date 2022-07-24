import { ContractTransaction, ethers } from 'ethers';
import Base from './base';
import Workflow from './workflow';
import Task from './task';
import SBT from './sbt';
import { getContract } from './utils';

export default class POB extends Base {
  private _workflow: Workflow;
  private _task: Task;
  private _sbt: SBT;

  private _signerOrProvider: ethers.providers.Provider | ethers.Signer;

  constructor(signerOrProvider: ethers.providers.Provider | ethers.Signer) {
    super(signerOrProvider);
    this._signerOrProvider = signerOrProvider;
    this._workflow = new Workflow(signerOrProvider);
    this._task = new Task(signerOrProvider);
    this._sbt = new SBT(signerOrProvider);

    this.switchNetwork();
  }

  get workflow() {
    if (this._workflow) return this._workflow;
    this._workflow = new Workflow(this._signerOrProvider);
    return this._workflow;
  }

  get task() {
    if (this._task) return this._task;
    this._task = new Task(this._signerOrProvider);
    return this._task;
  }

  get sbt() {
    if (this._sbt) return this._sbt;
    this._sbt = new SBT(this._signerOrProvider);
    return this._sbt;
  }

  async switchNetwork(chainId?: string) {
    const targetNetworkId = '0x5';

    // @ts-ignore
    if (window && window.ethereum) {
      // @ts-ignore
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId || targetNetworkId }],
      });
    }
  }

  async setFeeToken(token: string, enable: boolean): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract('Factory');
    return factorySignerContract.setFeeToken(token, enable);
  }

  async setRewardsToken(token: string, enable: boolean): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract('Factory');
    return factorySignerContract.setRewardsToken(token, enable);
  }

  async tokenApprove(
    token: string,
    spender?: string,
    amount?: ethers.BigNumber,
  ): Promise<ContractTransaction> {
    const erc20Contract = await this.getEthersSignerContract('ERC20', token);
    if (!spender) {
      // eslint-disable-next-line
      // @ts-ignore
      const factoryContract = getContract(this.chainId, 'Factory');

      if (!factoryContract) throw new Error('This network is not supported.');

      spender = factoryContract.address;
    }
    return erc20Contract.approve(spender, amount || ethers.constants.MaxUint256);
  }

  async tokenAllowance(token: string, owner: string, spender?: string): Promise<ethers.BigNumber> {
    const erc20Contract = await this.getEthersContract('ERC20', token);

    if (!spender) {
      // eslint-disable-next-line
      // @ts-ignore
      const factoryContract = getContract(this.chainId, 'Factory');

      if (!factoryContract) throw new Error('This network is not supported.');

      spender = factoryContract.address;
    }

    return erc20Contract.allowance(owner, spender);
  }
}
