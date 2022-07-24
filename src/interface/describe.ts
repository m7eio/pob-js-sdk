import { AnySchema } from 'ajv';

export interface IssuerDescribe {
  $schema: string;
  $id: string;
  title: string;
  description: string;
  properties: {
    name: string;
    description: string;
    namespace: string;
    metadata: {
      description: string;
      type: string;
      properties: {
        issuer: AnySchema;
        taker: AnySchema;
      };
    };
  };
  required: string[];
  type: string;
}

export interface CommonWorkflowTemplateDescribe {
  $schema: string;
  $id: string;
  title: string;
  description: string;
  tags: string[];
  properties: {
    issuer: AnySchema;
    [key: string]: any;
  };
  required: string[];
  type: string;
}

export interface CommonTaskTemplateDescribe {
  $schema: string;
  $id: string;
  title: string;
  description: string;
  tags: string[];
  properties: {
    issuer: AnySchema;
    taker: AnySchema;
    reviewer: AnySchema;
    [key: string]: any;
  };
  required: string[];
  type: string;
}
