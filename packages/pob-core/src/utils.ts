import { ethers } from "ethers";
import contractList from "./contract/contract-list";
import { ChianIdList } from "./interface/common";
import supportedChains, { IChainData } from "./chains";

export function getEthersSignerContract(
  contractAddress: string,
  abi: ethers.ContractInterface,
  signerOrProvider: ethers.providers.Provider | ethers.Signer
) {
  return new ethers.Contract(contractAddress, abi, signerOrProvider);
}

export function getEthersContract(
  contractAddress: string,
  abi: ethers.ContractInterface,
  signerOrProvider: ethers.providers.Provider | ethers.Signer
) {
  return new ethers.Contract(contractAddress, abi, signerOrProvider);
}

export function getContract(
  chainId: ChianIdList,
  contractName: keyof typeof contractList[ChianIdList]["contracts"]
) {
  if (!chainId) return;
  if (contractList[chainId]) {
    const contract = contractList[chainId].contracts[contractName];
    if (contract) {
      return contract;
    }
  }
  return;
}

export const formatBalance = (
  value: ethers.BigNumberish,
  decimals = 18,
  maxFraction = 2
) => {
  const formatted = ethers.utils.formatUnits(value, decimals);
  if (maxFraction > 0) {
    const split = formatted.split(".");
    if (split.length > 1) {
      return `${split[0]}.${split[1].substr(0, maxFraction)}`;
    }
  }
  return formatted;
};

export const parseBalance = (value: string, decimals = 18) => {
  return ethers.utils.parseUnits(value || "0", decimals);
};

export function getChainData(chainId: number): IChainData | null {
  const chainData = supportedChains.filter(
    (chain: any) => chain.chain_id === chainId
  )[0];

  return chainData;
}
