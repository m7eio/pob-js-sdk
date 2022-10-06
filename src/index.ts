import { ContractTransaction, ethers } from "ethers";
import Base from "./base";
import Workflow from "./workflow";
import Task from "./task";
import SBT from "./sbt";
import { getChainData, getContract } from "./utils";

export * as utils from "./utils";
export * as ipfs from "./ipfs";

export default class POB extends Base {
  private _workflow: Workflow;
  private _task: Task;
  private _sbt: SBT;

  private _signerOrProvider:
    | ethers.providers.Provider
    | ethers.Signer
    | undefined;

  constructor(
    signerOrProvider?: ethers.providers.Provider | ethers.Signer,
    options?: { endpoint?: string }
  ) {
    super(signerOrProvider, options);
    this._signerOrProvider = signerOrProvider;
    this._workflow = new Workflow(signerOrProvider, options);
    this._task = new Task(signerOrProvider, options);
    this._sbt = new SBT(signerOrProvider, options);

    // this.switchNetwork();
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
    const targetNetworkId = chainId || "0x89";
    const target = getChainData(+targetNetworkId);

    // @ts-ignore
    if (window && window.ethereum) {
      if (+targetNetworkId === this.chainId) return;
      try {
        // @ts-ignore
        if (this.provider.provider) {
          // @ts-ignore
          return this.provider.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: targetNetworkId }],
          });
        }

        // @ts-ignore
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: targetNetworkId }],
        });
      } catch (err) {
        // @ts-ignore
        if (this.provider.provider) {
          // @ts-ignore
          return this.provider.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: targetNetworkId,
                chainName: target?.name,
                nativeCurrency: {
                  name: target?.native_currency?.name,
                  symbol: target?.native_currency.symbol,
                  decimals: 18,
                },
                rpcUrls: [target?.rpc_url],
                blockExplorerUrls: [target?.blockExplorerUrls],
              },
            ],
          });
        }

        // @ts-ignore
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: targetNetworkId,
              chainName: target?.name,
              nativeCurrency: {
                name: target?.native_currency?.name,
                symbol: target?.native_currency.symbol,
                decimals: 18,
              },
              rpcUrls: [target?.rpc_url],
              blockExplorerUrls: [target?.blockExplorerUrls],
            },
          ],
        });
      }
    }
  }

  async setFeeToken(
    token: string,
    enable: boolean
  ): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract("Factory");
    return factorySignerContract.setFeeToken(token, enable);
  }

  async setRewardsToken(
    token: string,
    enable: boolean
  ): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract("Factory");
    return factorySignerContract.setRewardsToken(token, enable);
  }

  async tokenApprove(
    token: string,
    spender?: string,
    amount?: ethers.BigNumber
  ): Promise<ContractTransaction> {
    const erc20Contract = await this.getEthersSignerContract("ERC20", token);
    if (!spender) {
      // eslint-disable-next-line
      // @ts-ignore
      const factoryContract = getContract(this.chainId, "Factory");

      if (!factoryContract) throw new Error("This network is not supported.");

      spender = factoryContract.address;
    }
    return erc20Contract.approve(
      spender,
      amount || ethers.constants.MaxUint256
    );
  }

  async tokenAllowance(
    token: string,
    owner: string,
    spender?: string
  ): Promise<ethers.BigNumber> {
    const erc20Contract = await this.getEthersContract("ERC20", token);

    if (!spender) {
      // eslint-disable-next-line
      // @ts-ignore
      const factoryContract = getContract(this.chainId, "Factory");

      if (!factoryContract) throw new Error("This network is not supported.");

      spender = factoryContract.address;
    }

    return erc20Contract.allowance(owner, spender);
  }
}
