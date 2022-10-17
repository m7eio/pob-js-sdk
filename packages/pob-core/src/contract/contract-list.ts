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
        address: "0xB77026B93DE5EeaB6455B227252AE95d24afF55b",
        abi: FactoryABI.abi,
      },
      Payment: {
        address: "0x1A08ef499ACc04e19dC8a40F5B17974CD1d60A1E",
        abi: PaymentABI.abi,
      },
      SBTBase: {
        address: "0xeBf8826D262C37B3be1f0DDb7717F45A30207343",
        abi: SBTBaseABI.abi,
      },
      TaskBase: {
        address: "0x176A74Be115c5417bBE5FCF5CF3CF21de0a5B7dF",
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
