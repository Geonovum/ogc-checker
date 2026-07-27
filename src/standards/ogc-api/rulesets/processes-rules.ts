/**
 * Rule builders shared by the OGC API - Processes - Part 1: Core rulesets.
 *
 * Between 1.0 (18-062r2) and 2.0 (18-062r3) most requirements kept their
 * statement — and therefore their check — while their identifier, their
 * documentation anchor and the location of the referenced schema changed
 * (e.g. `/req/core/job` became `/req/core/job-op`). Every builder below
 * captures the check; the per-version ruleset files bind it to that version's
 * requirement key, documentation URL and schema URI.
 *
 * Builders whose requirement only exists in one version live here too, so that
 * the full Processes rule vocabulary stays in one place.
 */
import { APPLICATION_JSON_TYPE, errorMessage, hasParameter, hasPathMatch, hasSchemaMatch, OpenAPIV3_0 } from '@geonovum/standards-checker';
import type { IFunctionResult, RuleDefinition } from '@geonovum/standards-checker/spectral/core';
import { schema, truthy } from '@geonovum/standards-checker/spectral/functions';

/** A rule that only needs to know where its requirement is documented. */
export type ProcessesRule = (documentationUrl: string) => RuleDefinition;

/** A rule that additionally validates against a remote OpenAPI 3.0 schema document. */
export type ProcessesSchemaRule = (documentationUrl: string, schemaUri: string) => RuleDefinition;

const PROCESS_DESCRIPTION_PATH = '^\\/processes\\/[^/]+$';
const PROCESS_EXECUTION_PATH = '^\\/processes\\/[^/]+\\/execution$';
const JOB_PATH = '^\\/jobs\\/[^/]+$';
const JOB_RESULTS_PATH = '^\\/jobs\\/[^/]+\\/results$';
const JOB_RESULT_PATH = '^\\/jobs\\/[^/]+\\/results\\/[^/]+$';
const JOB_RESULT_0TH_PATH = '^\\/jobs\\/[^/]+\\/results\\/[^/]+\\/0$';

const given = (pattern: string, suffix = '') => `$.paths[?(@property.match(/${pattern}/))]${suffix}`;

/** `The server SHALL support the HTTP GET operation at the path <path>.` for a fixed path. */
const fixedPathOp =
  (path: string, method: 'get' | 'post'): ProcessesRule =>
  documentationUrl => ({
    given: '$.paths',
    message: `The server SHALL support the HTTP ${method.toUpperCase()} operation at the path \`${path}\`.`,
    documentationUrl,
    severity: 'error',
    then: {
      field: `${path}.${method}`,
      function: truthy,
    },
  });

/** Same, for a templated path — split in a "path is declared" and an "operation is declared" half. */
const templatedPathOp = (path: string, pattern: string, method: 'get' | 'post') => {
  const message = `The server SHALL support the HTTP ${method.toUpperCase()} operation at the path \`${path}\`.`;

  const declared: ProcessesRule = documentationUrl => ({
    given: '$.paths',
    message,
    documentationUrl,
    severity: 'error',
    then: {
      function: hasPathMatch,
      functionOptions: { pattern },
    },
  });

  const operation: ProcessesRule = documentationUrl => ({
    given: given(pattern),
    message,
    documentationUrl,
    severity: 'error',
    then: {
      field: method,
      function: truthy,
    },
  });

  return { declared, operation };
};

/** `A successful execution ... SHALL be reported as a response with a HTTP status code <status>.` */
const statusResponse =
  (givenPath: string, status: string, message: string): ProcessesRule =>
  documentationUrl => ({
    given: givenPath,
    message,
    documentationUrl,
    severity: 'error',
    then: {
      field: status,
      function: truthy,
    },
  });

/** Same, plus `The content of that response SHALL be based upon the OpenAPI 3.0 schema <schema>.` */
const statusResponseWithSchema =
  (givenPath: string, status: string, message: string): ProcessesSchemaRule =>
  (documentationUrl, schemaUri) => ({
    given: givenPath,
    message,
    documentationUrl,
    severity: 'error',
    then: [
      {
        field: status,
        function: truthy,
      },
      {
        field: status,
        function: hasSchemaMatch,
        functionOptions: { schemaUri },
      },
    ],
  });

/** Only the schema half — for requirements that constrain the content of an already-required response. */
const responseSchema =
  (givenPath: string, status: string, message: string): ProcessesSchemaRule =>
  (documentationUrl, schemaUri) => ({
    given: givenPath,
    message,
    documentationUrl,
    severity: 'error',
    then: {
      field: status,
      function: hasSchemaMatch,
      functionOptions: { schemaUri },
    },
  });

/** A query parameter that only has to exist with the given OpenAPI fragment. */
const queryParameter =
  (givenPath: string, spec: OpenAPIV3_0.ParameterObject): ProcessesRule =>
  documentationUrl => ({
    given: givenPath,
    message: `The operation SHALL support a parameter \`${spec.name}\`. {{error}}`,
    documentationUrl,
    severity: 'error',
    then: {
      function: hasParameter,
      functionOptions: { spec },
    },
  });

// --- Landing page ------------------------------------------------------------

export const landingPageOp = fixedPathOp('/', 'get');

export const landingPageSuccess = statusResponseWithSchema(
  "$.paths['/'].get.responses",
  '200',
  'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`.',
);

// --- Conformance declaration -------------------------------------------------

export const conformanceOp = fixedPathOp('/conformance', 'get');

export const conformanceSuccess = statusResponseWithSchema(
  "$.paths['/conformance'].get.responses",
  '200',
  'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`.',
);

// --- Process list ------------------------------------------------------------

export const processListOp = fixedPathOp('/processes', 'get');

export const processListLimitDefinition: ProcessesRule = documentationUrl => ({
  given: "$.paths['/processes'].get",
  message: 'The operation SHALL support a parameter `limit`. {{error}}',
  documentationUrl,
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
});

export const processListSuccess = statusResponseWithSchema(
  "$.paths['/processes'].get.responses",
  '200',
  'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`.',
);

// --- Process description -----------------------------------------------------

const processDescription = templatedPathOp('/processes/{processID}', PROCESS_DESCRIPTION_PATH, 'get');

export const processDescriptionOp = processDescription.declared;
export const processDescriptionGet = processDescription.operation;

export const processDescriptionSuccess = statusResponse(
  given(PROCESS_DESCRIPTION_PATH, '.get.responses'),
  '200',
  'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`.',
);

export const processExceptionNoSuchProcess = statusResponseWithSchema(
  given(PROCESS_DESCRIPTION_PATH, '.get.responses'),
  '404',
  'If the operation is executed using an invalid process identifier, the response SHALL be HTTP status code `404`.',
);

// --- Process execution -------------------------------------------------------

const processExecute = templatedPathOp('/processes/{processID}/execution', PROCESS_EXECUTION_PATH, 'post');

export const processExecuteOp = processExecute.declared;
export const processExecutePost = processExecute.operation;

export const processExecuteRequest: ProcessesSchemaRule = (documentationUrl, schemaUri) => ({
  given: given(PROCESS_EXECUTION_PATH, '.post'),
  message: 'The content of the request body SHALL be based upon the corresponding OpenAPI 3.0 schema document.',
  documentationUrl,
  severity: 'error',
  then: [
    {
      field: 'requestBody',
      function: truthy,
    },
    {
      field: 'requestBody',
      function: hasSchemaMatch,
      functionOptions: { schemaUri },
    },
    {
      field: 'requestBody.required',
      function: truthy,
    },
  ],
});

export const processExecuteSyncOne = statusResponse(
  given(PROCESS_EXECUTION_PATH, '.post.responses'),
  '200',
  'A successful synchronous execution SHALL be reported with HTTP status code `200`.',
);

/** 1.0 (`process-execute-sync-document`): document mode applies to any number of outputs. */
export const processExecuteSyncDocument = responseSchema(
  given(PROCESS_EXECUTION_PATH, '.post.responses'),
  '200',
  'For `response=document`, the response SHALL be a JSON document based on the `results.yaml` schema. {{error}}',
);

/** 2.0 (`process-execute-sync-many-json`): the same check, rescoped to multi-output execution. */
export const processExecuteSyncManyJson = responseSchema(
  given(PROCESS_EXECUTION_PATH, '.post.responses'),
  '200',
  'For multiple outputs, the response SHALL be a JSON document based on the `results.yaml` schema. {{error}}',
);

export const processExecuteSuccessAsync = statusResponseWithSchema(
  given(PROCESS_EXECUTION_PATH, '.post.responses'),
  '201',
  'A successful asynchronous execution SHALL be reported with HTTP status code `201`. {{error}}',
);

// --- Job status --------------------------------------------------------------

const job = templatedPathOp('/jobs/{jobID}', JOB_PATH, 'get');

export const jobOp = job.declared;
export const jobGet = job.operation;

export const jobSuccess = statusResponseWithSchema(
  given(JOB_PATH, '.get.responses'),
  '200',
  'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`. {{error}}',
);

export const jobExceptionNoSuchJob = statusResponseWithSchema(
  given(JOB_PATH, '.get.responses'),
  '404',
  'If the job identifier is invalid, the response SHALL have HTTP status code `404`. {{error}}',
);

// --- Job results -------------------------------------------------------------

const jobResults = templatedPathOp('/jobs/{jobID}/results', JOB_RESULTS_PATH, 'get');

export const jobResultsOp = jobResults.declared;
export const jobResultsGet = jobResults.operation;

/** 2.0 only — 1.0 has no `outputs` parameter on the job results operation. */
export const jobResultsParamOutputs = queryParameter(given(JOB_RESULTS_PATH, '.get'), {
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
});

/** 1.0 (`job-results-async-document`): async results respond as per the sync document mode. */
export const jobResultsAsyncDocument = statusResponseWithSchema(
  given(JOB_RESULTS_PATH, '.get.responses'),
  '200',
  'For `response=document`, the job results SHALL be a JSON document based on the `results.yaml` schema. {{error}}',
);

/** 2.0 (`job-results-async-many`): the same check, rescoped to multi-output retrieval. */
export const jobResultsAsyncMany = statusResponseWithSchema(
  given(JOB_RESULTS_PATH, '.get.responses'),
  '200',
  'A successful retrieval of multiple results SHALL be reported with HTTP status code `200`. {{error}}',
);

export const jobResultsExceptionInvalidQueryParameterValue = statusResponseWithSchema(
  given(JOB_RESULTS_PATH, '.get.responses'),
  '400',
  'If a query parameter has an invalid value, the response SHALL have HTTP status code `400`. {{error}}',
);

/** 2.0 only — 1.0 cannot request individual outputs, so there is no "no such output" exception. */
export const jobResultsExceptionNoSuchOutput = statusResponseWithSchema(
  given(JOB_RESULTS_PATH, '.get.responses'),
  '400',
  'If the operation requests an output identifier that does not exist, the response SHALL have HTTP status code `400`. {{error}}',
);

export const jobResultsExceptionNoSuchJob = statusResponseWithSchema(
  given(JOB_RESULTS_PATH, '.get.responses'),
  '404',
  'If the job identifier is invalid, the response SHALL have HTTP status code `404`. {{error}}',
);

export const jobResultsExceptionResultsNotReady = statusResponseWithSchema(
  given(JOB_RESULTS_PATH, '.get.responses'),
  '404',
  'If the job is still running, the response SHALL have HTTP status code `404`. {{error}}',
);

/** 2.0 only — introduced together with the per-output result resources. */
export const jobResultsExceptionResultsNotAvailable = statusResponseWithSchema(
  given(JOB_RESULTS_PATH, '.get.responses'),
  '404',
  'If no outputs are available, the response SHALL have HTTP status code `404`. {{error}}',
);

export const jobResultsFailed = responseSchema(
  given(JOB_RESULTS_PATH, '.get.responses'),
  '500',
  'If the job has failed, the response SHALL have an HTTP error code reflecting the failure. {{error}}',
);

// --- Single job result (2.0 only) --------------------------------------------

const jobResult = templatedPathOp('/jobs/{jobID}/results/{outputID}', JOB_RESULT_PATH, 'get');

export const jobResultOp = jobResult.declared;
export const jobResultGet = jobResult.operation;

const jobResult0th = templatedPathOp('/jobs/{jobID}/results/{outputID}/0', JOB_RESULT_0TH_PATH, 'get');

export const jobResultOp0th = jobResult0th.declared;
export const jobResultGet0th = jobResult0th.operation;

export const jobResultSuccess = statusResponse(
  given(JOB_RESULT_PATH, '.get.responses'),
  '200',
  'A successful retrieval of a single result SHALL be reported with HTTP status code `200`.',
);

// --- Job list ----------------------------------------------------------------

export const jobListOp = fixedPathOp('/jobs', 'get');

const jobListParameter = (name: string, schema: OpenAPIV3_0.SchemaObject) =>
  queryParameter('$.paths[/jobs].get', {
    name,
    in: 'query',
    required: false,
    schema,
  });

const stringArray: OpenAPIV3_0.SchemaObject = { type: 'array', items: { type: 'string' } };

export const jobListTypeDefinition = jobListParameter('type', stringArray);
export const jobListProcessIdDefinition = jobListParameter('processID', stringArray);
export const jobListStatusDefinition = jobListParameter('status', stringArray);
export const jobListDatetimeDefinition = jobListParameter('datetime', { type: 'string' });

/** 1.0 defines the duration bounds as integer arrays, 2.0 as plain integers. */
export const jobListDurationDefinition = (schema: OpenAPIV3_0.SchemaObject) => ({
  minDuration: jobListParameter('minDuration', schema),
  maxDuration: jobListParameter('maxDuration', schema),
});

export const jobListLimitDefinition = jobListParameter('limit', { type: 'integer' });

export const jobListSuccess = statusResponseWithSchema(
  '$.paths[/jobs].get.responses',
  '200',
  'A successful execution of the operation SHALL be reported as a response with a HTTP status code `200`. {{error}}',
);

// --- JSON --------------------------------------------------------------------

/**
 * Both versions list the same endpoints whose 200-responses SHALL support
 * `application/json`: `/`, `/conformance`, `/processes`, `/processes/{processID}`
 * and `/jobs/{jobID}`. The execution endpoint is excluded — its successful output
 * is content-negotiated and need not be JSON.
 */
export const jsonDefinition: ProcessesRule = documentationUrl => ({
  given: [
    '$.paths["/"].get.responses.200.content',
    '$.paths["/conformance"].get.responses.200.content',
    '$.paths[?(@property.match(/^\\/processes$/))].get.responses.200.content',
    given(PROCESS_DESCRIPTION_PATH, '.get.responses.200.content'),
    given(JOB_PATH, '.get.responses.200.content'),
  ],
  message: '200-responses of the server SHALL support the "application/json" media type. {{error}}',
  documentationUrl,
  severity: 'error',
  then: {
    function: schema,
    functionOptions: {
      schema: {
        type: 'object',
        required: [APPLICATION_JSON_TYPE],
      },
    },
  },
});

// --- OGC process description -------------------------------------------------

export const processDescriptionJsonEncoding: ProcessesSchemaRule = (documentationUrl, schemaUri) => ({
  given: given(PROCESS_DESCRIPTION_PATH, '.get.responses.200'),
  message: 'The process description SHALL validate against the `process.yaml` schema. {{error}}',
  documentationUrl,
  severity: 'error',
  then: {
    function: hasSchemaMatch,
    functionOptions: { schemaUri },
  },
});
