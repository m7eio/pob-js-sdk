export const DEFAULT_WORKFLOW_TEMPLATE_DESCRIBE = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'Quest Workflow Schema',
  description: 'Quest schema',
  type: 'object',
  properties: {
    metadata: {
      type: 'object',
      description: 'Metadata of the workflow.',
      properties: {
        issuer: {
          type: 'object',
          description: 'Form content for workflow issuer.',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the workflow.',
            },
            description: {
              type: 'string',
              description: 'Description of the workflow.',
            },
            namespace: {
              type: 'string',
              description: 'Namespace of the workflow.',
            },
          },
        },
      },
      required: ['name', 'description', 'namespace'],
    },
  },
  required: ['name', 'description', 'namespace', 'metadata'],
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
