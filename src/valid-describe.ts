import Ajv, { AnySchema } from 'ajv';

export const DESCRIBE_SCHEMA = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'POB Workflow or Task Schema',
  description: 'POB Workflow or Task Schema',
  type: 'object',
  properties: {
    issuer: {
      type: 'object',
      description: 'Form content for workflow or task issuer.',
    },
    taker: {
      type: 'object',
      description: 'Form content for workflow or task taker.',
    },
  },
  required: ['name', 'description', 'namespace', 'metadata'],
};

export const validateTakerDescribe = (jsonSchema: AnySchema, form: any) => {
  const ajv = new Ajv();
  const validate = ajv.compile(jsonSchema);
  return validate(form);
};

export const validateIssuerDescribe = (jsonSchema: AnySchema, form: any) => {
  const ajv = new Ajv();
  const validate = ajv.compile(jsonSchema);
  return validate(form);
};

export const validateSchema = (jsonSchema: AnySchema, form: any) => {
  const ajv = new Ajv();
  const validate = ajv.compile(jsonSchema);
  return validate(form);
};
