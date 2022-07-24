import { ContractTransaction, ethers } from 'ethers';
import Base from './base';
import { SBTParams, WorkflowTemplateRequest } from './interface/common';
import { CommonTaskTemplateDescribe, CommonWorkflowTemplateDescribe } from './interface/describe';
import { CommonTaskRequest } from './interface/task';
import { getJSONFromIPFS, saveJSONToIPFS } from './ipfs';
import {
  makeAddTasksCallData,
  makeApproveWorkflowCallData,
  makeCloseWorkflowCallData,
  makeCreateWorkflowCallData,
} from './make-call-data';

import { validateIssuerDescribe, validateSchema } from './valid-describe';
import { InfoResponse } from './contract/interface/WorkflowQuest';
import { parseBalance } from './utils';
import { ZERO_ADDRESS } from './const';

const serializeWorkflowParams = (params: any) => {
  if (params.withdrawTime === undefined) {
    params.withdrawTime = 7 * 24 * 60 * 60;
  }

  if (params.endTime === undefined) {
    params.endTime = 0;
  }

  if (!params.feeToken) {
    params.feeToken = ZERO_ADDRESS;
  }

  if (!params.feeReceiver) {
    params.feeReceiver = ZERO_ADDRESS;
  }

  if (!params.rewardsToken) {
    params.rewardsToken = ZERO_ADDRESS;
  }

  return params;
};

export default class Workflow extends Base {
  constructor(provider: ethers.providers.Provider | ethers.Signer) {
    super(provider);
  }

  async create<K extends keyof WorkflowTemplateRequest, P extends WorkflowTemplateRequest[K]>(
    templateIndex: K,
    SBT: SBTParams,
    workflowTemplateData: P,
    tasks: CommonTaskRequest[],
  ): Promise<ContractTransaction> {
    serializeWorkflowParams(workflowTemplateData);

    // Validator
    if (!workflowTemplateData.startTime || Number.isNaN(workflowTemplateData.startTime))
      throw new Error('startTime is required and must be a number.');
    if (workflowTemplateData.endTime === undefined) workflowTemplateData.endTime = 0;
    if (workflowTemplateData.endTime && Number.isNaN(workflowTemplateData.endTime))
      throw new Error('endTime must be a number.');
    if (!workflowTemplateData.reviewer) throw new Error('reviewer is required.');
    if (!workflowTemplateData.describe) throw new Error('describe is required.');
    if (workflowTemplateData.inOrder === undefined)
      throw new Error('task order is required. true or false.');
    // if it's parallel, minimumTasks is required.
    if (workflowTemplateData.inOrder === false && Number.isNaN(workflowTemplateData.minimumTasks)) {
      throw new Error('minimumTasks is required when inOrder is false.');
    }
    if (
      workflowTemplateData.inOrder === false &&
      (workflowTemplateData.minimumTasks > tasks.length || workflowTemplateData.minimumTasks === 0)
    ) {
      throw new Error('minimumTasks is less than task length and larger than 1');
    }
    tasks.every((task) => {
      if (workflowTemplateData.endTime === 0) {
        task.deadline = 0;
        return true;
      }
      if (task.deadline === undefined) {
        task.deadline = 0;
      }
      if (Number.isNaN(task.deadline)) {
        throw new Error('task deadline must be a number.');
      }

      if ((workflowTemplateData.endTime as number) - task.deadline < 1000) {
        throw new Error('task deadline must less than workflow end time.');
      }
      return true;
    });

    if (!SBT.defaultURI && !SBT.image) {
      throw new Error('defaultURI or image is required.');
    }

    if (SBT.image) {
      const hash = await saveJSONToIPFS(SBT);
      SBT = {
        name: SBT.name,
        symbol: SBT.symbol,
        defaultURI: `ipfs://${hash}`,
      };
    }

    const factorySignerContract = await this.getEthersSignerContract('Factory');
    const factoryContract = await this.getEthersContract('Factory');
    const workflowTemplageInfo = await factoryContract.getWorkflowTemplateInfo(templateIndex);
    const taskInfo = await Promise.all<InfoResponse[]>(
      tasks.map((task) => factoryContract.getTaskInfo(task.taskIndex)),
    );

    const workflowJsonDescribe = await getJSONFromIPFS<CommonWorkflowTemplateDescribe>(
      workflowTemplageInfo.describe,
    );

    const isWorkflowDescribeValid = validateSchema(
      workflowJsonDescribe.properties.issuer,
      workflowTemplateData.describe,
    );

    if (!isWorkflowDescribeValid) throw new Error('workflow describe not valid.');

    for (let index = 0; index < tasks.length; index++) {
      const task = tasks[index];
      const taskJsonDescribe = await getJSONFromIPFS<CommonTaskTemplateDescribe>(
        taskInfo[index].describe,
      );
      const isTaskDescribeValid = validateIssuerDescribe(
        taskJsonDescribe.properties.issuer,
        task.describe,
      );
      if (!isTaskDescribeValid) throw new Error('task describe not valid.');
      const describeHash = await saveJSONToIPFS(task.describe);
      task.describe = describeHash;
    }

    const describeHash = await saveJSONToIPFS(workflowTemplateData.describe);
    workflowTemplateData.describe = describeHash;

    console.log('makeCreateWorkflowCallData', templateIndex, workflowTemplateData);
    const callData = makeCreateWorkflowCallData(templateIndex, workflowTemplateData);

    let decimals;

    if (workflowTemplateData.rewardsToken !== ZERO_ADDRESS) {
      const rewardsTokenContract = await this.getEthersContract(
        'ERC20',
        workflowTemplateData.rewardsToken,
      );
      decimals = await rewardsTokenContract.decimals();
    } else if (workflowTemplateData.feeToken !== ZERO_ADDRESS) {
      const rewardsTokenContract = await this.getEthersContract(
        'ERC20',
        workflowTemplateData.feeToken,
      );
      decimals = await rewardsTokenContract.decimals();
    }
    console.log('makeAddTasksCallData', tasks, decimals);

    const tasksCallData = makeAddTasksCallData(tasks, decimals);
    // const gasLimit = await factorySignerContract.estimateGas.createWorkflow(
    //   templateIndex,
    //   SBT,
    //   callData,
    //   tasksCallData,
    // );

    return factorySignerContract.createWorkflow(templateIndex, SBT, callData, tasksCallData);
  }

  async createTemplate(
    templateAddress: string,
    describe: string,
    feeAmount?: string,
    feeToken?: string,
    feeReceiver?: string,
  ) {
    const factorySignerContract = await this.getEthersSignerContract('Factory');

    if (feeAmount) {
      const erc20Contract = await this.getEthersContract('ERC20', feeToken);
      const decimals = await erc20Contract.decimals();

      return factorySignerContract.createWorkflowTemplate(
        templateAddress,
        parseBalance(feeAmount, decimals),
        feeToken,
        feeReceiver,
        describe,
      );
    } else {
      return factorySignerContract.createWorkflowTemplate(
        templateAddress,
        parseBalance('0'),
        '0x542E99eF0FF07aFC8CdDaB29EF4d50A74A299097',
        '0x0000000000000000000000000000000000000000',
        describe,
      );
    }
  }

  // async addTasks(takss: CommonTaskRequest[]) {
  //   const factorySignerContract = await this.getEthersSignerContract('Factory');

  //   const callData = makeAddTasksCallData(taskIndex, taker, rewards);
  //   return factorySignerContract.callWorkflow(workflow, callData);
  // }

  async enableTemplate(index: number, enable: boolean): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract('Factory');
    return factorySignerContract.enableWorkflowTemplate(index, enable);
  }

  async apply(workflow: string): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract('Factory');
    return factorySignerContract.applyFor(workflow);
  }

  async approve(workflow: string, taker: string[]): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract('Factory');
    const callData = makeApproveWorkflowCallData(taker);
    return factorySignerContract.callWorkflow(workflow, callData);
  }

  async close(workflow: string): Promise<ContractTransaction> {
    const factorySignerContract = await this.getEthersSignerContract('Factory');
    const callData = makeCloseWorkflowCallData();
    return factorySignerContract.callWorkflow(workflow, callData);
  }

  async getTakerAppliedWorkflows(taker: string) {
    return this.api.getTakerWorkflowsWithStatus(taker, 'applied');
  }

  async getTakerApprovedWorkflows(taker: string, filter?: string, sort?: string) {
    return this.api.getTakerWorkflowsWithStatus(taker, 'approved');
  }

  async getTakerClaimedSBTWorkflows(taker: string, filter?: string, sort?: string) {
    return this.api.getTakerWorkflowsWithStatus(taker, 'claimed', filter, sort);
  }

  async getIssuerCreatedWorkflows(taker: string, filter?: string, sort?: string) {
    return this.api.getIssuerWorkflowsWithStatus(taker, filter, sort);
  }

  async getReviewerApprovedWorkflows(taker: string, filter?: string, sort?: string) {
    return this.api.getReviewerWorkflowsWithStatus(taker, 'approved', filter, sort);
  }

  async getReviewerRejectedWorkflows(taker: string, filter?: string, sort?: string) {
    return this.api.getReviewerWorkflowsWithStatus(taker, 'rejected', filter, sort);
  }

  async getTemplates(page = 1, pageSize = 10, filter?: string, sort?: string) {
    return this.api.getWorkflowTemplates(page, pageSize, filter, sort);
  }

  async getTemplate(templateIndex: number) {
    return this.api.getWorkflowTemplate(templateIndex);
  }

  async getWorkflows(page = 1, pageSize = 10, filter?: string, sort?: string) {
    return this.api.getWorkflows(page, pageSize, filter, sort);
  }

  /**
   * Get workflow info
   * @param workflow workflow contract address
   * @returns Promise<Workflow>
   */
  async getWorkflow(workflow: string) {
    return this.api.getWorkflow(workflow);
  }

  async getWorkflowOnchain(workflow: string) {
    const workflowContract = await this.getEthersContract('WorkflowQuest', workflow);
    return workflowContract.getWorkflowInfo();
  }

  async getTakersWithStatus(
    workflow: string,
    status: string[] = [],
    filter?: string,
    sort?: string,
  ) {
    return this.api.getWorkflowTakersWithStatus(
      workflow,
      status.length > 0 ? `status_in_${status.join('|')},${filter || ''}` : filter,
      sort,
    );
  }

  async getTakerStatus(workflow: string, taker: string) {
    return this.api.getWorkflowTakerStatus(workflow, taker);
  }

  async getTakerStatusOnchain(workflow: string, taker: string) {
    const workflowContract = await this.getEthersContract('WorkflowQuest', workflow);
    return workflowContract.takerWorkflowStatus(taker);
  }

  async getTakerWorkflowsWithStatus(taker: string, status: 'applied' | 'approved' | 'claimed') {
    return this.api.getTakerWorkflowsWithStatus(taker, status);
  }
}
