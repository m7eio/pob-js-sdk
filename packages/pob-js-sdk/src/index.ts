import { ContractTransaction, ethers, Overrides } from "ethers";
import Base, { workflowPlugin, utils } from "@m7eio/pob-core";
import { Workflow } from "@m7eio/pob-core/dist/cjs/plugin-register";
export * as CONSTS from "./const";
import { WorkflowTemplate } from "./types";

const { getChainData, getContract } = utils;
const { registerPlugins, getPlugin } = workflowPlugin;

export default class POB extends Base {
  constructor(
    signerOrProvider?: ethers.providers.Provider | ethers.Signer,
    options?: { endpoint?: string }
  ) {
    super(signerOrProvider, options);
    // this.switchNetwork();
  }

  static registerWorkflow(workflow: Workflow) {
    if (!workflow.init) {
      throw new Error("Please ensure you have init method.");
    }
    registerPlugins({ ...workflow, type: "workflow" });
  }

  getWorkflow<T>(name: string): T {
    const workflow = getPlugin(name);
    if (!workflow.init) {
      throw new Error("Please ensure you have init method.");
    }

    const inst = workflow.init(this.signerOrProvider, this.options);

    return inst as T;
  }

  async addWorkflowTemplate(
    template: string,
    feeToken: string,
    feeReceiver: string,
    feeAmount: number,
    description: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.addWorkflowTemplate(
      template,
      feeToken,
      feeReceiver,
      feeAmount,
      description,
      overrides || {}
    );
  }

  async setTemplateFeeReceiver(
    template: string,
    feeReceiver: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.setTemplateFeeReceiver(
      template,
      feeReceiver,
      overrides || {}
    );
  }

  async setTemplateFeeToken(
    template: string,
    feeToken: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.setTemplateFeeToken(template, feeToken, overrides || {});
  }

  async setTemplateFeeAmount(
    template: string,
    amount: ethers.BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.setTemplateFeeAmount(template, amount, overrides || {});
  }

  async setPlatformTaxGlobal(
    rates: number,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.setPlatformTaxGlobal(rates, overrides || {});
  }

  async setPlatformTaxMiddleman(
    rates: number,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.setPlatformTaxMiddleman(rates, overrides || {});
  }

  async setPlatformTaxTemplate(
    rates: number,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.setPlatformTaxTemplate(rates, overrides || {});
  }

  async setPlatformTaxReceiver(
    rates: number,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.setPlatformTaxReceiver(rates, overrides || {});
  }

  async setWithdrawPeriod(
    period: ethers.BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.setReturnPeriod(period, overrides || {});
  }

  async withdrawPlatformTax(
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");

    return contract.withdrawPlatformTax(token, overrides || {});
  }
  async enableWorkflowTemplate(
    template: string,
    enable: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract("Factory");
    return factorySignerContract.enableWorkflowTemplate(
      template,
      enable,
      overrides || {}
    );
  }

  async createWorkflow(
    template: string,
    reviewer: string,
    rewardsToken: string,
    startTime: number,
    description: string,
    tokenUri: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = await this.getEthersSignerContract("Factory");
    return contract.createWorkflow(
      template,
      reviewer,
      rewardsToken,
      startTime,
      description,
      tokenUri,
      overrides || {}
    );
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

  async setSettlementToken(
    token: string,
    enable: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract("Factory");
    return factorySignerContract.setSettlementToken(
      token,
      enable,
      overrides || {}
    );
  }

  async tokenApprove(
    token: string,
    spender?: string,
    amount?: ethers.BigNumber,
    overrides?: Overrides
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
      amount || ethers.constants.MaxUint256,
      overrides || {}
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

  /* read methods start */
  async getTemplateInfo(template: string): Promise<WorkflowTemplate> {
    const contract = await this.getEthersContract("Factory");
    return contract.getTemplateInfo(template);
  }

  async getSBTContractAddress(): Promise<string> {
    const contract = await this.getEthersContract("Factory");
    return contract.sbt();
  }

  async getTaskContractAddress(): Promise<string> {
    const contract = await this.getEthersContract("Factory");
    return contract.task();
  }

  async getPaymentContractAddress(): Promise<string> {
    const contract = await this.getEthersContract("Factory");
    return contract.payment();
  }

  async getPlatformTaxReceiver(): Promise<string> {
    const contract = await this.getEthersContract("Factory");
    return contract.platformTaxReceiver();
  }

  async getPlatformTaxGlobal(): Promise<ethers.BigNumber> {
    const contract = await this.getEthersContract("Factory");
    return contract.platformTaxGlobal();
  }

  async getPlatformTaxMiddleman(): Promise<ethers.BigNumber> {
    const contract = await this.getEthersContract("Factory");
    return contract.platformTaxMiddleman();
  }

  async getPlatformTaxTemplate(): Promise<ethers.BigNumber> {
    const contract = await this.getEthersContract("Factory");
    return contract.platformTaxTemplate();
  }

  async getWithdrawPeriod(): Promise<ethers.BigNumber> {
    const contract = await this.getEthersContract("Factory");
    return contract.returnPeriod();
  }

  async isSettlementToken(token: string): Promise<boolean> {
    const contract = await this.getEthersContract("Factory");
    return contract.isSettlementToken(token);
  }
}
