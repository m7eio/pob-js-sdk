import FactoryABI from "./Factory.json";
import SBTBaseABI from "./SBTBase.json";
import TaskBaseABI from "./TaskBase.json";
import WorkflowQuestABI from "./WorkflowQuest.json";
import GerneralWorkflow from "./GerneralWorkflow.json";
import ERC20ABI from "./ERC20.json";

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
      WorkflowQuest: {
        address: "0x44f57c7846Edc7a8c9e472f9be43AaaDbc5b07B6",
        abi: WorkflowQuestABI.abi,
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
        address: "0x989F5340Bdf924c30df28e431A44a468F4ad46f8",
        abi: FactoryABI.abi,
      },
      SBTBase: {
        address: "0xD764aAd3b1D16ECA979EDf69A8e76055F81AdFD7",
        abi: SBTBaseABI.abi,
      },
      TaskBase: {
        address: "0xae63ab4622cb591A5E5b2DA2AFf0a7242e5fF3b0",
        abi: TaskBaseABI.abi,
      },
      WorkflowQuest: {
        address: "0x4bdE704A35eE66BB68007CF77d21e72855d1955f",
        abi: WorkflowQuestABI.abi,
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
  137: {
    contracts: {
      Factory: {
        address: '0xd34CA91fB14B84CaB5A4Fa089a3BC5f6a12C3140',
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
      WorkflowQuest: {
        address: "0xc19c05F719eC8Ecf91a5F2705DED70caEB8a7C8B",
        abi: WorkflowQuestABI.abi,
      },
      GerneralWorkflow: {
        address: '0xc19c05F719eC8Ecf91a5F2705DED70caEB8a7C8B',
        abi: GerneralWorkflow.abi,
      },
      // POBToken: {
      //   address: "0x542E99eF0FF07aFC8CdDaB29EF4d50A74A299097",
      //   abi: ERC20ABI.abi,
      // },
      ERC20: {
        address: "0x0000000000000000000000000000000000000000",
        abi: ERC20ABI.abi,
      },
    },
  },
};

export default contract;
