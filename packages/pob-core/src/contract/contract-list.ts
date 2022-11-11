import FactoryABI from "./Factory.json";
import SBTBaseABI from "./SBTBase.json";
import TaskBaseABI from "./TaskBase.json";
import ERC20ABI from "./ERC20.json";
import PaymentABI from "./Payment.json";

const contract = {
  1: {
    contracts: {
      Factory: {
        address: "0x5dBd18585AaEB749c241Bee6415427cb93473463",
        abi: FactoryABI.abi,
      },
      SBTBase: {
        address: "0x87535F4119730dc26510640B69236a7676AF449D",
        abi: SBTBaseABI.abi,
      },
      TaskBase: {
        address: "0x5a1Eb511690158A4e3403FcB4F17D9E9BED791A7",
        abi: TaskBaseABI.abi,
      },
      POBToken: {
        address: "0x542E99eF0FF07aFC8CdDaB29EF4d50A74A299097",
        abi: ERC20ABI.abi,
      },
      ERC20: {
        address: "0x0000000000000000000000000000000000000000",
        abi: ERC20ABI.abi,
      },
    },
  },
  5: {
    contracts: {
      Factory: {
        address: "0xE4Ba26F2F6f2E90F9359771B0FF29f58b6D5be95",
        abi: FactoryABI.abi,
      },
      Payment: {
        address: "0x4B80E867670B825eAbeE9E630ddFFcA5E684990E",
        abi: PaymentABI.abi,
      },
      SBTBase: {
        address: "0x78dFd94704Ba2e3e5424be34cd5d453c9E734599",
        abi: SBTBaseABI.abi,
      },
      TaskBase: {
        address: "0x2D200ba6D5e1A5e99C004AF1d06Bf723B50b1897",
        abi: TaskBaseABI.abi,
      },
      ERC20: {
        address: "0x0000000000000000000000000000000000000000",
        abi: ERC20ABI.abi,
      },
    },
  },
  137: {
    contracts: {
      Factory: {
        address: '0xB77026B93DE5EeaB6455B227252AE95d24afF55b',
        abi: FactoryABI.abi,
      },
      SBTBase: {
        address: '0xfd0cD5edcB4AaD080f875863410bAA90F0BB4036',
        abi: SBTBaseABI.abi,
      },
      TaskBase: {
        address: '0x8B9019439C4E5e4EFe5c003BbA23DAb3594Ab0e5',
        abi: TaskBaseABI.abi,
      },
      ERC20: {
        address: "0x0000000000000000000000000000000000000000",
        abi: ERC20ABI.abi,
      },
    },
  },
};

export default contract;
