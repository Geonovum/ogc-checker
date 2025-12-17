import type { IFunctionResult, RulesetDefinition } from '@stoplight/spectral-core';
import { oas3_0 } from '@stoplight/spectral-formats';
import { truthy } from '@stoplight/spectral-functions';
import hasParameter from '../../../functions/hasParameter';
import hasPathMatch from '../../../functions/hasPathMatch';
import hasSchemaMatch from '../../../functions/hasSchemaMatch';
import { OpenAPIV3_0 } from '../../../openapi-types';
import { errorMessage } from '../../../util';

export const OGC_API_PROCESSES_CORE_URI = 'http://www.opengis.net/spec/ogcapi-processes-1/1.0/conf/core';

export const OGC_API_PROCESSES_CORE_DOC_URI = 'https://docs.ogc.org/DRAFTS/18-062r3.html#/req_core_';

export const SCHEMAS_URI_PREFIX = 'https://raw.githubusercontent.com/opengeospatial/ogcapi-processes/master/openapi/schemas/';

const processesCore: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/ogcapi-processes-1/1.0/req/core',
  description: 'OGC API - Processes - Part 1: Core - Requirements Class "Core"',
  formats: [oas3_0],
  rules: {
    '/req/core/landingpage-op': {
      given: '$.paths',
      message: 'The server SHALL support the HTTP GET operation at the path `/`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'landingpage-op',
      severity: 'error',
      then: {
        field: '/.get',
        function: truthy,
      },
    },
    '/req/core/landingpage-success': {
      given: "$.paths['/'].get.responses",
      message: 'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'landingpage-success',
      severity: 'error',
      then: [
        {
          field: '200',
          function: truthy,
        },
        {
          field: '200',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'common-core/landingPage.yaml',
          },
        },
      ],
    },
    '/req/core/conformance-op': {
      given: '$.paths',
      message: 'The server SHALL support the HTTP GET operation at the path `/conformance`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'conformance-op',
      severity: 'error',
      then: {
        field: '/conformance.get',
        function: truthy,
      },
    },
    '/req/core/conformance-success': {
      given: "$.paths['/conformance'].get.responses",
      message: 'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'conformance-success',
      severity: 'error',
      then: [
        {
          field: '200',
          function: truthy,
        },
        {
          field: '200',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'common-core/confClasses.yaml',
          },
        },
      ],
    },
    '/req/core/process-list-op': {
      given: '$.paths',
      message: 'The server SHALL support the HTTP GET operation at the path `/processes`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-list-op',
      severity: 'error',
      then: {
        field: '/processes.get',
        function: truthy,
      },
    },
    '/req/core/pl-limit-definition': {
      given: "$.paths['/processes'].get",
      message: 'The operation SHALL support a parameter `limit`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'pl-limit-definition',
      severity: 'error',
      then: {
        function: hasParameter,
        functionOptions: {
          spec: {
            name: 'limit',
            in: 'query',
          },
          validateSchema: (schema: OpenAPIV3_0.SchemaObject, paramPath: (string | number)[]): IFunctionResult[] => {
            if (!schema.type) {
              return errorMessage('Schema is missing.', paramPath);
            }

            if (schema.type !== 'integer') {
              return errorMessage('Schema type must be integer.', [...paramPath, 'schema']);
            }

            if (schema.minimum == undefined || schema.maximum === undefined || schema.default === undefined) {
              return errorMessage('Integer schema must contain explicit values for "minimum", "maximum" and "default".', [
                ...paramPath,
                'schema',
              ]);
            }

            return [];
          },
        },
      },
    },
    '/req/core/process-list-success': {
      given: "$.paths['/processes'].get.responses",
      message: 'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-list-success',
      severity: 'error',
      then: [
        {
          field: '200',
          function: truthy,
        },
        {
          field: '200',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'processes-core/processList.yaml',
          },
        },
      ],
    },
    '/req/core/process-description-op': {
      given: '$.paths',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-description-op',
      message: 'The server SHALL support the HTTP GET operation at the path `/processes/{processID}`.',
      severity: 'error',
      then: {
        function: hasPathMatch,
        functionOptions: {
          pattern: '^\\/processes\\/[^/]+$',
        },
      },
    },
    '/req/core/process-description-op#get': {
      given: '$.paths[?(@property.match(/^\\/processes\\/[^/]+$/))]',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-description-op',
      message: 'The server SHALL support the HTTP GET operation at the path `/processes/{processID}`.',
      severity: 'error',
      then: {
        field: 'get',
        function: truthy,
      },
    },
    '/req/core/process-description-success': {
      given: '$.paths[?(@property.match(/^\\/processes\\/[^/]+$/))].get.responses',
      message: 'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-description-success',
      severity: 'error',
      then: {
        field: '200',
        function: truthy,
      },
    },
    '/req/core/process-exception/no-such-process': {
      given: '$.paths[?(@property.match(/^\\/processes\\/[^/]+$/))].get.responses',
      message: 'If the operation is executed using an invalid process identifier, the response SHALL be HTTP status code `404`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-exception-no-such-process',
      severity: 'error',
      then: [
        {
          field: '404',
          function: truthy,
        },
        {
          field: '404',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'common-core/exception.yaml',
          },
        },
      ],
    },
    '/req/core/process-execute-op': {
      given: '$.paths',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-execute-op',
      message: 'The server SHALL support the HTTP POST operation at the path `/processes/{processID}/execution`.',
      severity: 'error',
      then: {
        function: hasPathMatch,
        functionOptions: {
          pattern: '^\\/processes\\/[^/]+\\/execution$',
        },
      },
    },
    '/req/core/process-execute-op#post': {
      given: '$.paths[?(@property.match(/^\\/processes\\/[^/]+\\/execution$/))]',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-execute-op',
      message: 'The server SHALL support the HTTP POST operation at the path `/processes/{processID}/execution`.',
      severity: 'error',
      then: {
        field: 'post',
        function: truthy,
      },
    },
    '/req/core/process-execute-request': {
      given: '$.paths[?(@property.match(/^\\/processes\\/[^/]+\\/execution$/))].post',
      message: 'The content of the request body SHALL be based upon the corresponding OpenAPI 3.0 schema document.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-execute-request',
      severity: 'error',
      then: [
        {
          field: 'requestBody',
          function: truthy,
        },
        {
          field: 'requestBody',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'processes-core/execute.yaml',
          },
        },
        {
          field: 'requestBody.required',
          function: truthy,
        },
      ],
    },
    '/req/core/process-execute-sync-one': {
      given: '$.paths[?(@property.match(/^\\/processes\\/[^/]+\\/execution$/))].post.responses',
      message: 'A successful synchronous execution SHALL be reported with HTTP status code `200`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-execute-sync-one',
      severity: 'error',
      then: {
        field: '200',
        function: truthy,
      },
    },
    '/req/core/process-execute-sync-many-json': {
      given: '$.paths[?(@property.match(/^\\/processes\\/[^/]+\\/execution$/))].post.responses',
      message: 'For multiple outputs, the response SHALL be a JSON document based on the `results.yaml` schema. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-execute-sync-many-json',
      severity: 'error',
      then: {
        field: '200',
        function: hasSchemaMatch,
        functionOptions: {
          schemaUri: SCHEMAS_URI_PREFIX + 'processes-core/results.yaml',
        },
      },
    },
    '/req/core/process-execute-success-async': {
      given: '$.paths[?(@property.match(/^\\/processes\\/[^/]+\\/execution$/))].post.responses',
      message: 'A successful asynchronous execution SHALL be reported with HTTP status code `201`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'process-execute-success-async',
      severity: 'error',
      then: [
        {
          field: '201',
          function: truthy,
        },
        {
          field: '201',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'processes-core/statusInfo.yaml',
          },
        },
      ],
    },
    '/req/core/job-op': {
      given: '$.paths',
      message: 'The server SHALL support the HTTP GET operation at the path `/jobs/{jobID}`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-op',
      severity: 'error',
      then: {
        function: hasPathMatch,
        functionOptions: {
          pattern: '^\\/jobs\\/[^/]+$',
        },
      },
    },
    '/req/core/job-op#get': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+$/))]',
      message: 'The server SHALL support the HTTP GET operation at the path `/jobs/{jobID}`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-op',
      severity: 'error',
      then: {
        field: 'get',
        function: truthy,
      },
    },
    '/req/core/job-success': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+$/))].get.responses',
      message: 'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-success',
      severity: 'error',
      then: [
        {
          field: '200',
          function: truthy,
        },
        {
          field: '200',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'processes-core/statusInfo.yaml',
          },
        },
      ],
    },
    '/req/core/job-exception-no-such-job': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+$/))].get.responses',
      message: 'If the job identifier is invalid, the response SHALL have HTTP status code `404`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-exception-no-such-job',
      severity: 'error',
      then: [
        {
          field: '404',
          function: truthy,
        },
        {
          field: '404',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'common-core/exception.yaml',
          },
        },
      ],
    },
    '/req/core/job-results-op': {
      given: '$.paths',
      message: 'The server SHALL support the HTTP GET operation at the path `/jobs/{jobID}/results`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-op',
      severity: 'error',
      then: {
        function: hasPathMatch,
        functionOptions: {
          pattern: '^\\/jobs\\/[^/]+\\/results$',
        },
      },
    },
    '/req/core/job-results-op#get': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results$/))]',
      message: 'The server SHALL support the HTTP GET operation at the path `/jobs/{jobID}/results`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-op',
      severity: 'error',
      then: {
        field: 'get',
        function: truthy,
      },
    },
    '/req/core/job-results-param-outputs': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results$/))].get',
      message: 'The operation SHALL support a parameter `outputs`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-param-outputs',
      severity: 'error',
      then: {
        function: hasParameter,
        functionOptions: {
          spec: {
            name: 'outputs',
            in: 'query',
            required: false,
            style: 'form',
            explode: false,
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    '/req/core/job-result-op': {
      given: '$.paths',
      message: 'The server SHALL support the HTTP GET operation at the path `/jobs/{jobID}/results/{outputID}`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-result-op',
      severity: 'error',
      then: {
        function: hasPathMatch,
        functionOptions: {
          pattern: '^\\/jobs\\/[^/]+\\/results\\/[^/]+$',
        },
      },
    },
    '/req/core/job-result-op#get': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results\\/[^/]+$/))]',
      message: 'The server SHALL support the HTTP GET operation at the path `/jobs/{jobID}/results/{outputID}`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-result-op',
      severity: 'error',
      then: {
        field: 'get',
        function: truthy,
      },
    },
    '/req/core/job-results-async-one': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results\\/[^/]+$/))].get.responses',
      message: 'A successful retrieval of a single result SHALL be reported with HTTP status code `200`.',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-async-one',
      severity: 'error',
      then: {
        field: '200',
        function: truthy,
      },
    },
    '/req/core/job-results-async-many': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results$/))].get.responses',
      message: 'A successful retrieval of multiple results SHALL be reported with HTTP status code `200`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-async-many',
      severity: 'error',
      then: [
        {
          field: '200',
          function: truthy,
        },
        {
          field: '200',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'processes-core/results.yaml',
          },
        },
      ],
    },
    '/req/core/job-results-exception/invalid-query-parameter-value': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results$/))].get.responses',
      message: 'If a query parameter has an invalid value, the response SHALL have HTTP status code `400`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-exception-invalid-query-parameter-value',
      severity: 'error',
      then: [
        {
          field: '400',
          function: truthy,
        },
        {
          field: '400',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'common-core/exception.yaml',
          },
        },
      ],
    },
    '/req/core/job-results-exception/no-such-job': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results$/))].get.responses',
      message: 'If the job identifier is invalid, the response SHALL have HTTP status code `404`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-exception-no-such-job',
      severity: 'error',
      then: [
        {
          field: '404',
          function: truthy,
        },
        {
          field: '404',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'common-core/exception.yaml',
          },
        },
      ],
    },
    '/req/core/job-results-exception/results-not-ready': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results$/))].get.responses',
      message: 'If the job is still running, the response SHALL have HTTP status code `404`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-exception-results-not-ready',
      severity: 'error',
      then: [
        {
          field: '404',
          function: truthy,
        },
        {
          field: '404',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'common-core/exception.yaml',
          },
        },
      ],
    },
    '/req/core/job-results-exception/results-not-available': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results$/))].get.responses',
      message: 'If no outputs are available, the response SHALL have HTTP status code `404`. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-exception-results-not-available',
      severity: 'error',
      then: [
        {
          field: '404',
          function: truthy,
        },
        {
          field: '404',
          function: hasSchemaMatch,
          functionOptions: {
            schemaUri: SCHEMAS_URI_PREFIX + 'common-core/exception.yaml',
          },
        },
      ],
    },
    '/req/core/job-results-failed': {
      given: '$.paths[?(@property.match(/^\\/jobs\\/[^/]+\\/results$/))].get.responses',
      message: 'If the job has failed, the response SHALL have an HTTP error code reflecting the failure. {{error}}',
      documentationUrl: OGC_API_PROCESSES_CORE_DOC_URI + 'job-results-failed',
      severity: 'error',
      then: {
        field: '500',
        function: hasSchemaMatch,
        functionOptions: {
          schemaUri: SCHEMAS_URI_PREFIX + 'common-core/exception.yaml',
        },
      },
    },
  },
};

export default processesCore;
