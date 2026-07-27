import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { oas3_0 } from './formats';
import * as rule from './processes-rules';

export const OGC_API_PROCESSES_CORE_URI = 'http://www.opengis.net/spec/ogcapi-processes-1/2.0/conf/core';

export const OGC_API_PROCESSES_CORE_DOC_URI = 'https://docs.ogc.org/DRAFTS/18-062r3.html#req_core_';

// The v2.0 schemas are not yet published under https://schemas.opengis.net/ogcapi/processes/part1/2.0/
// (18-062r3 is still a draft), so the `master` branch — which tracks the 2.0 revision — is the live source.
export const SCHEMAS_URI_PREFIX = 'https://raw.githubusercontent.com/opengeospatial/ogcapi-processes/master/openapi/schemas/';

const doc = (anchor: string) => OGC_API_PROCESSES_CORE_DOC_URI + anchor;

const commonSchema = (name: string) => `${SCHEMAS_URI_PREFIX}common-core/${name}.yaml`;
const coreSchema = (name: string) => `${SCHEMAS_URI_PREFIX}processes-core/${name}.yaml`;

const processesCore: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/ogcapi-processes-1/2.0/req/core',
  description: 'OGC API - Processes - Part 1: Core - Requirements Class "Core"',
  formats: [oas3_0],
  rules: {
    '/req/core/landingpage-op': rule.landingPageOp(doc('landingpage-op')),
    '/req/core/landingpage-success': rule.landingPageSuccess(doc('landingpage-success'), commonSchema('landingPage')),
    '/req/core/conformance-op': rule.conformanceOp(doc('conformance-op')),
    '/req/core/conformance-success': rule.conformanceSuccess(doc('conformance-success'), commonSchema('confClasses')),
    '/req/core/process-list-op': rule.processListOp(doc('process-list-op')),
    '/req/core/pl-limit-definition': rule.processListLimitDefinition(doc('pl-limit-definition')),
    '/req/core/process-list-success': rule.processListSuccess(doc('process-list-success'), coreSchema('processList')),
    '/req/core/process-description-op': rule.processDescriptionOp(doc('process-description-op')),
    '/req/core/process-description-op#get': rule.processDescriptionGet(doc('process-description-op')),
    '/req/core/process-description-success': rule.processDescriptionSuccess(doc('process-description-success')),
    '/req/core/process-exception-no-such-process': rule.processExceptionNoSuchProcess(
      doc('process-exception-no-such-process'),
      commonSchema('exception'),
    ),
    '/req/core/process-execute-op': rule.processExecuteOp(doc('process-execute-op')),
    '/req/core/process-execute-op#post': rule.processExecutePost(doc('process-execute-op')),
    '/req/core/process-execute-request': rule.processExecuteRequest(doc('process-execute-request'), coreSchema('execute')),
    '/req/core/process-execute-sync-one': rule.processExecuteSyncOne(doc('process-execute-sync-one')),
    '/req/core/process-execute-sync-many-json': rule.processExecuteSyncManyJson(
      doc('process-execute-sync-many-json'),
      coreSchema('results'),
    ),
    '/req/core/process-execute-success-async': rule.processExecuteSuccessAsync(
      doc('process-execute-success-async'),
      coreSchema('statusInfo'),
    ),
    '/req/core/job-op': rule.jobOp(doc('job-op')),
    '/req/core/job-op#get': rule.jobGet(doc('job-op')),
    '/req/core/job-success': rule.jobSuccess(doc('job-success'), coreSchema('statusInfo')),
    '/req/core/job-exception-no-such-job': rule.jobExceptionNoSuchJob(doc('job-exception-no-such-job'), commonSchema('exception')),
    '/req/core/job-results-op': rule.jobResultsOp(doc('job-results-op')),
    '/req/core/job-results-op#get': rule.jobResultsGet(doc('job-results-op')),
    '/req/core/job-results-param-outputs': rule.jobResultsParamOutputs(doc('job-results-param-outputs')),
    '/req/core/job-result-op': rule.jobResultOp(doc('job-result-op')),
    '/req/core/job-result-op#get': rule.jobResultGet(doc('job-result-op')),
    '/req/core/job-result-op-0th': rule.jobResultOp0th(doc('job-result-op-0th')),
    '/req/core/job-result-op-0th#get': rule.jobResultGet0th(doc('job-result-op-0th')),
    '/req/core/job-results-async-one': rule.jobResultSuccess(doc('job-results-async-one')),
    '/req/core/job-results-async-many': rule.jobResultsAsyncMany(doc('job-results-async-many'), coreSchema('results')),
    '/req/core/job-results-exception-invalid-query-parameter-value': rule.jobResultsExceptionInvalidQueryParameterValue(
      doc('job-results-exception_invalid-query-parameter-value'),
      commonSchema('exception'),
    ),
    '/req/core/job-results-exception-no-such-output': rule.jobResultsExceptionNoSuchOutput(
      doc('job-results-exception-no-such-output'),
      commonSchema('exception'),
    ),
    '/req/core/job-results-exception-no-such-job': rule.jobResultsExceptionNoSuchJob(
      doc('job-results-exception-no-such-job'),
      commonSchema('exception'),
    ),
    '/req/core/job-results-exception-results-not-ready': rule.jobResultsExceptionResultsNotReady(
      doc('job-results-exception_results-not-ready'),
      commonSchema('exception'),
    ),
    '/req/core/job-results-exception-results-not-available': rule.jobResultsExceptionResultsNotAvailable(
      doc('job-results-exception_results-not-available'),
      commonSchema('exception'),
    ),
    '/req/core/job-results-failed': rule.jobResultsFailed(doc('job-results-failed'), commonSchema('exception')),
  },
};

export default processesCore;
