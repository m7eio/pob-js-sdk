import fetch from 'isomorphic-fetch';
import qs from 'qs';

import Base from './base';
import { PaginateResult, Response } from './interface/common';
import { TaskLogResponse, TaskStatus } from './interface/task';
import {
  WorkflowLogResponse,
  TaskResponse,
  WorkflowTakerStatus,
  WorkflowResponse,
} from './interface/workflow';
import { WorkflowTemplateaResponse } from './interface/workflow/template';

export default class API {
  public endpoint: string;

  // @ts-ignore
  private pobBase: Base;

  constructor(pobBase: Base, endpoint?: string) {
    this.endpoint = endpoint || 'https://alpha.pob.work/api/v1';
    this.pobBase = pobBase;
  }

  async getWorkflowTemplate(templateIndex: number) {
    if (!templateIndex) throw new Error('workflow template index is required.');

    const api = `${this.endpoint}/workflow/template/${templateIndex}`;
    return (await fetch(api)).json();
  }

  async getWorkflowTemplates(
    page = 1,
    pageSize = 10,
    filter?: string,
    sort?: string,
  ): Promise<Response<PaginateResult<WorkflowTemplateaResponse[]>>> {
    const query = qs.stringify({ page, pageSize, filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/template${query}`;
    return (await fetch(api)).json();
  }

  async getWorkflows(
    page = 1,
    pageSize = 10,
    filter?: string,
    sort?: string,
  ): Promise<Response<PaginateResult<WorkflowResponse>>> {
    const query = qs.stringify({ page, pageSize, filter, sort }, { addQueryPrefix: true });
    const api = `${this.endpoint}/workflow${query}`;
    return (await fetch(api)).json();
  }

  async getWorkflow(workflow: string): Promise<Response<WorkflowResponse>> {
    const api = `${this.endpoint}/workflow/${workflow}`;
    return (await fetch(api)).json();
  }

  async getWorkflowTasks(
    workflow: string,
    page = 1,
    pageSize = 10,
    filter?: string,
    sort?: string,
  ): Promise<Response<PaginateResult<TaskResponse>>> {
    const query = qs.stringify({ page, pageSize, filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/${workflow}/task${query}`;
    return (await fetch(api)).json();
  }

  async getWorkflowTask(
    workflow: string,
    taskIndex: number | string,
  ): Promise<Response<TaskResponse>> {
    const api = `${this.endpoint}/workflow/${workflow}/task/${taskIndex}`;
    return (await fetch(api)).json();
  }

  /**
   * Get all takers status for a given workflow
   * @param workflow workflow contract address
   * @param status filter by status
   */
  async getWorkflowTakersWithStatus(
    workflow: string,
    filter?: string,
    sort?: string,
  ): Promise<Response<PaginateResult<WorkflowTakerStatus>>> {
    const query = qs.stringify({ filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/${workflow}/status/taker${query}`;
    return (await fetch(api)).json();
  }

  /**
   * Get taker status of a workflow
   * @param workflow workflow contract address
   * @param address taker address
   */
  async getWorkflowTakerStatus(
    workflow: string,
    taker: string,
  ): Promise<Response<WorkflowTakerStatus>> {
    const api = `${this.endpoint}/workflow/${workflow}/status/taker/${taker}`;
    return (await fetch(api)).json();
  }

  async getTakerWorkflowsWithStatus(
    taker: string,
    status: 'applied' | 'approved' | 'claimed',
    filter?: string,
    sort?: string,
  ): Promise<Response<PaginateResult<WorkflowLogResponse>>> {
    const query = qs.stringify({ filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/taker/${taker}/${status}${query}`;
    return (await fetch(api)).json();
  }

  async getIssuerWorkflowsWithStatus(
    issuer: string,
    filter?: string,
    sort?: string,
  ): Promise<Response<PaginateResult<WorkflowLogResponse>>> {
    const query = qs.stringify({ filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/issuer/${issuer}/created${query}`;
    return (await fetch(api)).json();
  }

  async getReviewerWorkflowsWithStatus(
    reviewer: string,
    status: 'approved' | 'rejected',
    filter?: string,
    sort?: string,
  ): Promise<Response<PaginateResult<WorkflowLogResponse>>> {
    const query = qs.stringify({ filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/reviewer/${reviewer}/${status}${query}`;
    return (await fetch(api)).json();
  }

  async getTaskTemplate(taskIndex: number | string) {
    const api = `${this.endpoint}/task/template/${taskIndex}`;
    return (await fetch(api)).json();
  }

  async getTaskTemplates(page = 1, pageSize = 10) {
    const query = qs.stringify({ page, pageSize }, { addQueryPrefix: true });

    const api = `${this.endpoint}/task/template${query}`;
    return (await fetch(api)).json();
  }

  async getTasks(page = 1, pageSize = 10) {
    const query = qs.stringify({ page, pageSize }, { addQueryPrefix: true });

    const api = `${this.endpoint}/task${query}`;
    return (await fetch(api)).json();
  }

  async getTakerTaskStatus(
    workflow: string,
    taskIndex: number | string,
    taker: string,
  ): Promise<Response<TaskStatus>> {
    const api = `${this.endpoint}/workflow/${workflow}/status/taker/${taker}/task/${taskIndex}`;
    return (await fetch(api)).json();
  }

  async getTakerTasksStatus(
    workflow: string,
    taker: string,
    filter?: string,
    sort?: string,
  ): Promise<Response<PaginateResult<TaskStatus>>> {
    const query = qs.stringify({ filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/${workflow}/status/taker/${taker}/task${query}`;
    return (await fetch(api)).json();
  }

  async getTaskStatus(
    workflow: string,
    taskIndex: number,
    filter?: string,
    sort?: string,
  ): Promise<Response<PaginateResult<TaskStatus>>> {
    const query = qs.stringify({ filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/${workflow}/task/${taskIndex}/taker${query}`;
    return (await fetch(api)).json();
  }

  async getSBTInfo(address: string, tokenId?: number) {
    const query = qs.stringify({ tokenId }, { addQueryPrefix: true });

    const api = `${this.endpoint}/sbt/${address}${query}`;
    return (await fetch(api)).json();
  }

  async getTakerTaskLogs(
    workflow: string,
    taskIndex: number | string,
    taker: string,
    filter?: {
      [key: string]: string;
    },
    sort?: {
      [key: string]: string;
    },
  ): Promise<Response<PaginateResult<TaskLogResponse>>> {
    const query = qs.stringify({ filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/${workflow}/task/${taskIndex}/log/taker/${taker}${query}`;
    return (await fetch(api)).json();
  }

  async getTaskLogs(
    workflow: string,
    taskIndex: number,
    filter?: {
      [key: string]: string;
    },
    sort?: {
      [key: string]: string;
    },
  ): Promise<Response<PaginateResult<TaskLogResponse[]>>> {
    const query = qs.stringify({ filter, sort }, { addQueryPrefix: true });

    const api = `${this.endpoint}/workflow/${workflow}/task/${taskIndex}/log${query}`;
    return (await fetch(api)).json();
  }
}
