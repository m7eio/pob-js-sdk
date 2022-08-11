import { AnySchema } from "ajv";
import { ContractTransaction, ethers } from "ethers";
import Base from "./base";
import { ZERO_ADDRESS } from "./const";
import { CommonTaskTemplateDescribe } from "./interface/describe";
import { getJSONFromIPFS, saveJSONToIPFS } from "./ipfs";
import {
  makeApproveTaskCallData,
  makeRejectTaskCallData,
} from "./make-call-data";
import { parseBalance } from "./utils";
import { validateSchema } from "./valid-describe";

export default class Task extends Base {
  constructor(provider?: ethers.providers.Provider | ethers.Signer, options?: { endpoint?: string }) {
    super(provider, options);
  }

  async createTemplate(
    describe: AnySchema,
    registerFee?: string,
    feeToken?: string,
    feeReceiver?: string
  ): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract("Factory");
    const describeHash = await saveJSONToIPFS(describe);

    return factorySignerContract.createTaskTemplate(
      parseBalance(registerFee || "0"),
      feeToken || ZERO_ADDRESS,
      feeReceiver || ZERO_ADDRESS,
      describeHash
    );
  }

  async enableTemplate(
    index: number,
    enable: boolean
  ): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract("Factory");
    return factorySignerContract.enableTask(index, enable);
  }

  async approve(
    workflow: string,
    taskIndex: number,
    taker: string,
    content?: { [key: string]: any },
    rewards?: ethers.BigNumber
  ): Promise<ContractTransaction> {
    const taskResponse = await this.getTask(workflow, taskIndex);
    if (!taskResponse.data) throw new Error(taskResponse.msg);

    const factoryContract = await this.getEthersContract("Factory");
    const taskTemplateInfo = await factoryContract.getTaskInfo(
      +taskResponse.data.templateIndex
    );
    const taskTemplateDescribe = taskTemplateInfo[8];

    const describeJSON = await getJSONFromIPFS<CommonTaskTemplateDescribe>(
      taskTemplateDescribe
    );
    if (
      describeJSON.properties.reviewer &&
      !validateSchema(describeJSON.properties.reviewer, content)
    ) {
      throw new Error("form content for reviewer is invalid.");
    }

    const factorySignerContract = await this.getEthersSignerContract("Factory");

    let hash = "";
    if (content) {
      hash = await saveJSONToIPFS(content);
    }

    const callData = makeApproveTaskCallData(
      taskIndex,
      taker,
      rewards || ethers.constants.Zero,
      hash
    );
    return factorySignerContract.callWorkflow(workflow, callData);
  }

  async reject(
    workflow: string,
    taskIndex: number,
    taker: string,
    content?: { [key: string]: any }
  ): Promise<ContractTransaction>  {
    const taskResponse = await this.getTask(workflow, taskIndex);
    if (!taskResponse.data) throw new Error(taskResponse.msg);

    const factoryContract = await this.getEthersContract("Factory");
    const taskTemplateInfo = await factoryContract.getTaskInfo(
      +taskResponse.data.templateIndex
    );
    const taskTemplateDescribe = taskTemplateInfo[8];

    const factorySignerContract = await this.getEthersSignerContract("Factory");
    const describeJSON = await getJSONFromIPFS<CommonTaskTemplateDescribe>(
      taskTemplateDescribe
    );

    if (
      describeJSON.properties.reviewer &&
      !validateSchema(describeJSON.properties.reviewer, content)
    ) {
      throw new Error("form content for reviewer is invalid.");
    }

    let hash = "";
    if (content) {
      hash = await saveJSONToIPFS(content);
    }

    const callData = makeRejectTaskCallData(taskIndex, taker, hash);
    return factorySignerContract.callWorkflow(workflow, callData);
  }

  async submit(
    workflow: string,
    taskIndex: number,
    content: { [key: string]: any }
  ): Promise<ContractTransaction>  {
    const taskResponse = await this.getTask(workflow, taskIndex);
    if (!taskResponse.data) throw new Error(taskResponse.msg);

    const factoryContract = await this.getEthersContract("Factory");
    const taskTemplateInfo = await factoryContract.getTaskInfo(
      +taskResponse.data.templateIndex
    );
    const taskTemplateDescribe = taskTemplateInfo[8];

    const factorySignerContract = await this.getEthersSignerContract("Factory");

    const describeJSON = await getJSONFromIPFS<CommonTaskTemplateDescribe>(
      taskTemplateDescribe
    );
    if (
      describeJSON.properties.taker &&
      !validateSchema(describeJSON.properties.taker, content)
    ) {
      throw new Error("task content is invalid.");
    }

    const hash = await saveJSONToIPFS(content);
    return factorySignerContract.submit(workflow, taskIndex, hash);
  }

  async getTemplate(taskIndex: number | string) {
    return this.api.getTaskTemplate(taskIndex);
  }

  async getTemplates(page = 1, pageSize = 10) {
    return this.api.getTaskTemplates(page, pageSize);
  }

  async getTasks(
    workflow: string,
    page = 1,
    pageSize = 10,
    filter?: string,
    sort?: string
  ) {
    return this.api.getWorkflowTasks(workflow, page, pageSize, filter, sort);
  }

  async getTask(workflow: string, taskIndex: string | number) {
    return this.api.getWorkflowTask(workflow, taskIndex);
  }

  async getTaskOnchain(workflow: string, taskIndex: string | number) {
    const workflowContract = await this.getEthersContract(
      "WorkflowQuest",
      workflow
    );
    return workflowContract.getTaskInfo(taskIndex);
  }

  async getTaskStatus(
    workflow: string,
    taskIndex: number,
    filter?: string,
    sort?: string
  ) {
    return this.api.getTaskStatus(workflow, taskIndex, filter, sort);
  }

  async getTaskStatusOnChain(
    workflow: string,
    taskIndex: string | number,
    taker: string
  ) {
    const workflowContract = await this.getEthersContract(
      "WorkflowQuest",
      workflow
    );
    const taskStatus = await workflowContract.takerTaskStatus(taskIndex, taker);

    return taskStatus;
  }

  async getTakerTaskStatus(
    workflow: string,
    taskIndex: string | number,
    taker: string
  ) {
    return this.api.getTakerTaskStatus(workflow, taskIndex, taker);
  }

  async getTakerTasksStatus(
    workflow: string,
    taker: string,
    filter?: string,
    sort?: string
  ) {
    return this.api.getTakerTasksStatus(workflow, taker, filter, sort);
  }

  async getTakerTaskLog(
    workflow: string,
    taskIndex: number | string,
    taker: string,
    action: ("submitted" | "approved" | "rejected")[] = []
  ) {
    return this.api.getTakerTaskLogs(
      workflow,
      taskIndex,
      taker,
      action.length ? `action:${action}` : ""
    );
  }

  async getTaskLogs(
    workflow: string,
    taskIndex: number,
    action: ("submitted" | "approved" | "rejected")[] = []
  ) {
    return this.api.getTaskLogs(workflow, taskIndex, `action:${action}`);
  }
}
