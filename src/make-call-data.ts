import { ethers } from 'ethers';
import { WorkflowTemplateRequest } from './interface/common';
import { CommonTaskRequest } from './interface/task';
import { parseBalance } from './utils';

export function makeCreateWorkflowCallData<
  K extends keyof WorkflowTemplateRequest,
  P extends WorkflowTemplateRequest[K],
>(templateIndex: K, templateParams: P) {
  let workflowParamsType;

  // Quest Workflow
  if (templateIndex === 0) {
    workflowParamsType =
      'tuple(bool inOrder, uint256 minimumTasks, uint256 startTime, uint256 endTime, uint256 withdrawTime, address reviewer, address feeReceiver, address rewardsToken, address feeToken, string describe) WorkflowParams';

    const workflowParamsBytes = ethers.utils.defaultAbiCoder.encode(
      [workflowParamsType],
      [
        {
          ...templateParams,
          startTime: parseInt(`${templateParams.startTime / 1000}`),
          endTime: parseInt(`${(templateParams.endTime || 0) / 1000}`),
        },
      ],
    );

    return workflowParamsBytes;
  }

  workflowParamsType =
    'tuple(bool inOrder, uint256 minimumTasks, uint256 startTime, uint256 endTime, uint256 withdrawTime, address reviewer, address feeReceiver, address rewardsToken, address feeToken, string describe) WorkflowParams';

  const workflowParamsBytes = ethers.utils.defaultAbiCoder.encode(
    [workflowParamsType],
    [
      {
        ...templateParams,
        startTime: parseInt(`${templateParams.startTime / 1000}`),
        endTime: parseInt(`${(templateParams.endTime || 0) / 1000}`),
      },
    ],
  );

  return workflowParamsBytes;
}

export function makeApproveWorkflowCallData(taker: string[]) {
  const ABI = [`function approveWorkflow(address[])`];
  const intface = new ethers.utils.Interface(ABI);
  const calldata = intface.encodeFunctionData('approveWorkflow', [taker]);
  return calldata;
}

export function makeCloseWorkflowCallData() {
  const ABI = [`function endWorkflow()`];
  const intface = new ethers.utils.Interface(ABI);
  const calldata = intface.encodeFunctionData('endWorkflow', []);
  return calldata;
}

export function makeClaimWorkflowSBTCallData() {
  const ABI = [`function claim()`];
  const intface = new ethers.utils.Interface(ABI);
  const calldata = intface.encodeFunctionData('claim', []);
  return calldata;
}

export function makeAddTasksCallData(taskData: CommonTaskRequest[], decimals?: number) {
  const TaskParamsType =
    'tuple(bool onlyOneWinner, uint256 taskIndex, address reviewer, uint256 totalRewards, uint256 feeAmount, uint256 deadline, string describe) TaskParams';

  const TaskParamsBytes = ethers.utils.defaultAbiCoder.encode(
    [TaskParamsType],
    taskData.map((task) => {
      return {
        ...task,
        totalRewards: parseBalance(task.totalRewards || '0', decimals),
        feeAmount: parseBalance(task.feeAmount || '0', decimals),
      };
    }),
  );

  return [TaskParamsBytes];
}

export function makeApproveTaskCallData(
  taskIndex: number,
  taker: string,
  rewards: ethers.BigNumber,
  content: string,
) {
  const ABI = [
    `
    function approveTask(uint256 index, address taker, uint256 rewards, string content)
  `,
  ];
  const intface = new ethers.utils.Interface(ABI);
  const calldata = intface.encodeFunctionData('approveTask', [taskIndex, taker, rewards, content]);
  return calldata;
}

export function makeRejectTaskCallData(taskIndex: number, taker: string, content: string) {
  const ABI = [
    `
    function rejectTask(uint256 taskIndex, address taker, string content)
  `,
  ];
  const intface = new ethers.utils.Interface(ABI);
  const calldata = intface.encodeFunctionData('rejectTask', [taskIndex, taker, content]);
  return calldata;
}
