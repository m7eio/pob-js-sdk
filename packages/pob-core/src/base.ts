import { ethers } from "ethers";
import { ChianIdList } from "./interface/common";
import contractList from "./contract/contract-list";

import {
  getEthersSignerContract,
  getContract,
  getEthersContract,
} from "./utils";

interface IOptions {
  endpoint?: string;
}

export default class Base {
  public signerOrProvider:
    | ethers.providers.Provider
    | ethers.Signer
    | undefined;

  public provider: ethers.providers.Provider | undefined;

  public signer: ethers.Signer | undefined;

  public chainId: number | undefined;

  public options: IOptions;

  constructor(
    signerOrProvider?: ethers.providers.Provider | ethers.Signer,
    options?: IOptions
  ) {
    this.signerOrProvider = signerOrProvider;

    this.options = options || {};

    if (ethers.Signer.isSigner(signerOrProvider)) {
      this.provider = (this.signerOrProvider as ethers.Signer)
        .provider as ethers.providers.Provider;
      this.signer = this.signerOrProvider as ethers.Signer;
      this._init();
    } else if (ethers.providers.Provider.isProvider(signerOrProvider)) {
      this.provider = this.signerOrProvider as ethers.providers.Provider;

      // eslint-disable-next-line
      // @ts-ignore
      if (typeof this.provider.getSigner === "function") {
        try {
          // eslint-disable-next-line
          // @ts-ignore
          this.signer = this.provider.getSigner();
        } catch (error) {
          // empty
        }
      }
      this._init();
    } else {
      console.warn("no signer or provider.");
    }
  }

  private async _init() {
    if (!this.provider) return;
    const network = await this.provider.getNetwork();
    this.chainId = network.chainId;
  }

  private async getChainId(): Promise<number> {
    if (this.chainId) return this.chainId;
    if (!this.provider) throw new Error("[getChainId]: provider not initialized.");
    const network = await this.provider.getNetwork();
    this.chainId = network.chainId;
    return this.chainId;
  }

  async getEthersSignerContract(
    contractName: keyof typeof contractList[ChianIdList]["contracts"],
    address?: string
  ) {
    const chainId = await this.getChainId();
    const contract = getContract(chainId as ChianIdList, contractName);
    if (!contract) throw new Error("chain id not supported.");

    const factorySignerContract = getEthersSignerContract(
      address || contract.address,
      contract.abi,
      this.signer as ethers.Signer
    );

    return factorySignerContract;
  }

  async getEthersContract(
    contractName: keyof typeof contractList[ChianIdList]["contracts"],
    address?: string
  ) {
    if (!this.signerOrProvider) throw new Error("[getEthersContract]: provider not initialized.");

    const chainId = await this.getChainId();

    const contract = getContract(chainId as ChianIdList, contractName);
    if (!contract) throw new Error("chain id not supported.");

    const factorySignerContract = getEthersContract(
      address || contract.address,
      contract.abi,
      this.signerOrProvider
    );

    return factorySignerContract;
  }
}
