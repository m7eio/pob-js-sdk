import Core from "@m7eio/pob-core";
import {
  ethers,
  ContractInterface,
  ContractTransaction,
  Overrides,
} from "ethers";

import abi from "./abi.json";

class GeneralWorkflow extends Core {
  public templateAddress = "0xF67ba30AB0C5b43fA681aC6C4687c9c33A7C8609";

  constructor(
    signerOrProvider?: ethers.providers.Provider | ethers.Signer,
    options?: { endpoint?: string }
  ) {
    super(signerOrProvider, options);
  }

  async setTaskReviewer(
    workflow: string,
    taskId: number,
    taskReviewer: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.setTaskReviewer(taskId, taskReviewer, overrides || {});
  }

  async enableTasks(
    workflow: string,
    taskIds: number[],
    enable: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.enableTasks(taskIds, enable, overrides || {});
  }

  async endWorkflow(
    workflow: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.endWorkflow(overrides || {});
  }

  async withdraw(
    workflow: string,
    receiver: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.refund(receiver, overrides || {});
  }

  async recharge(
    workflow: string,
    amount: ethers.BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.topUp(amount, overrides || {});
  }

  async multicall(
    workflow: string,
    callData: any[],
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.multicall(callData, overrides || {});
  }

  async setSBTUri(
    workflow: string,
    uri: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.setSBTUri(uri, overrides || {});
  }

  async setJudge(
    workflow: string,
    judge: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.setJudge(judge, overrides || {});
  }

  async addMiddleman(
    workflow: string,
    middleman: string[],
    commissionRate: number[],
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.addMiddleman(middleman, commissionRate, overrides || {});
  }

  async apply(
    workflow: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.applyFor(overrides || {});
  }

  async submit(
    workflow: string,
    taskId: number,
    content: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.submit(taskId, content, overrides || {});
  }

  async approve(
    workflow: string,
    taskId: number,
    taker: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.approve(taskId, taker, overrides || {});
  }

  async reject(
    workflow: string,
    taskId: number,
    taker: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.reject(taskId, taker, overrides || {});
  }

  async mintSBT(
    workflow: string,
    taker: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.mintSBT(taker, overrides || {});
  }

  async burnSBT(
    workflow: string,
    taker: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.burnSBT(taker, overrides || {});
  }

  async appeal(
    workflow: string,
    taskId: number,
    submitId: number,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.appeal(taskId, submitId, overrides || {});
  }

  async accept(
    workflow: string,
    petitionId: number,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.accept(petitionId, overrides || {});
  }

  async verdict(
    workflow: string,
    petitionId: number,
    approve: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.verdict(petitionId, approve, overrides || {});
  }

  async setRewardsToken(
    workflow: string,
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.setRewardsToken(workflow, token, overrides || {});
  }

  async addTasks(
    workflow: string,
    tasks: {
      rewards: ethers.BigNumberish;
      reviewer: string;
      description: string;
    }[],
    overrides?: Overrides
  ): Promise<ContractTransaction> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.addTasks(tasks, overrides || {});
  }

  /* read methods start */
  async getWorkflowInfo(workflow: string) {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.getWorkflowInfo();
  }

  async getTaskInfo(workflow: string, taskId: number) {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.getTaskInfo(taskId);
  }

  async taskCounts(workflow: string) {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.taskCounts();
  }

  async applicantCounts(workflow: string) {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.applicantCounts();
  }

  async sbtId(workflow: string) {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.sbtId();
  }

  async judge(workflow: string) {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.judge();
  }

  async getSBTUri(workflow: string) {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.getSBTUri();
  }

  async workflowStatus(workflow: string, taker: string) {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.workflowStatus(taker);
  }

  async taskStatus(workflow: string, taker: string, taskid: number) {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.taskStatus(taker, taskid);
  }

  async getWorkflowBalance(workflow: string): Promise<ethers.BigNumber> {
    const contract = new ethers.Contract(
      workflow,
      abi.abi as any as ContractInterface,
      this.signerOrProvider
    );

    return contract.getWorkflowBalance();
  }
}

export default GeneralWorkflow;
