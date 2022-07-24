import { ethers } from 'ethers';
import { ChianIdList } from './interface/common';
import contractList from './contract/contract-list';

import { getEthersSignerContract, getContract, getEthersContract } from './utils';
import API from './api';

export default class Base {
  public signerOrProvider: ethers.providers.Provider | ethers.Signer;

  public provider: ethers.providers.Provider;

  public signer: ethers.Signer | undefined;

  public chainId: number | undefined;

  public api: API;

  constructor(
    signerOrProvider: ethers.providers.Provider | ethers.Signer,
    options?: { endpoint?: string },
  ) {
    this.signerOrProvider = signerOrProvider;
    this.api = new API(this, options?.endpoint);

    if (ethers.Signer.isSigner(signerOrProvider)) {
      this.provider = (this.signerOrProvider as ethers.Signer)
        .provider as ethers.providers.Provider;
      this.signer = this.signerOrProvider as ethers.Signer;
    } else if (ethers.providers.Provider.isProvider(signerOrProvider)) {
      this.provider = this.signerOrProvider as ethers.providers.Provider;

      // eslint-disable-next-line
      // @ts-ignore
      if (typeof this.provider.getSigner === 'function') {
        // eslint-disable-next-line
        // @ts-ignore
        this.signer = this.provider.getSigner();
      }
    } else {
      throw new Error('invalid signer or provider, it must be ethers provider or signer.');
    }

    this._init();
  }

  private async _init() {
    const network = await this.provider.getNetwork();
    this.chainId = network.chainId;
  }

  private async getChainId(): Promise<number> {
    if (this.chainId) return this.chainId;
    const network = await this.provider.getNetwork();
    this.chainId = network.chainId;
    return this.chainId;
  }

  async getEthersSignerContract(
    contractName: keyof typeof contractList[ChianIdList]['contracts'],
    address?: string,
  ) {
    const chainId = await this.getChainId();
    const contract = getContract(chainId as ChianIdList, contractName);
    if (!contract) throw new Error('chain id not supported.');

    const factorySignerContract = getEthersSignerContract<typeof contractName>(
      address || contract.address,
      contract.abi,
      this.signer as ethers.Signer,
    );

    return factorySignerContract;
  }

  async getEthersContract(
    contractName: keyof typeof contractList[ChianIdList]['contracts'],
    address?: string,
  ) {
    const chainId = await this.getChainId();

    const contract = getContract(chainId as ChianIdList, contractName);
    if (!contract) throw new Error('chain id not supported.');

    const factorySignerContract = getEthersContract<typeof contractName>(
      address || contract.address,
      contract.abi,
      this.signerOrProvider,
    );

    return factorySignerContract;
  }
}
