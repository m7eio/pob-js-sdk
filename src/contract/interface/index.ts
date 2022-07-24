import { POBToken } from './POBToken';
import { Factory } from './Factory';
import { SBTBase } from './SBTBase';
import { TaskBase } from './TaskBase';
import { WorkflowQuest } from './WorkflowQuest';

export default interface ContractInterface {
  POBToken: POBToken;
  Factory: Factory;
  SBTBase: SBTBase;
  TaskBase: TaskBase;
  WorkflowQuest: WorkflowQuest;
  ERC20: POBToken;
}
