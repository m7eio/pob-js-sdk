import { ethers } from "ethers";

// import factoryABI from "../src/contract/Factory.json";
// import ERC20ABI from "../src/contract/ERC20.json";
import paymentABI from "../src/contract/Payment.json";
// import sbtBaseABI from "../src/contract/SBTBase.json";
// import taskBaseABI from "../src/contract/TaskBase.json";
// import workflowBaseABI from "../src/contract/WorkflowBase.json";

function main(_abi: any[]) {
  const iface = new ethers.utils.Interface(_abi);

  let events = {};
  _abi
    .filter((abi) => abi.type === "event")
    .map((abi) => {
      events[abi.name] = iface.getEventTopic(abi.name);
    });
  console.log("abiTopics: ", JSON.stringify(events));
}

main(paymentABI.abi);