import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { oas3_0 } from './formats';
import * as rule from './processes-rules';

export const OGC_API_PROCESSES_V1_CORE_URI = 'http://www.opengis.net/spec/ogcapi-processes-1/1.0/conf/core';

export const OGC_API_PROCESSES_V1_CORE_DOC_URI = 'https://docs.ogc.org/is/18-062r2/18-062r2.html#req_core_';

// 1.0 is an approved standard, so its schemas are published on schemas.opengis.net —
// as a single flat directory (2.0 splits them into `common-core` and `processes-core`).
export const SCHEMAS_URI_PREFIX = 'https://schemas.opengis.net/ogcapi/processes/part1/1.0/openapi/schemas/';

const doc = (anchor: string) => OGC_API_PROCESSES_V1_CORE_DOC_URI + anchor;

const schema = (name: string) => `${SCHEMAS_URI_PREFIX}${name}.yaml`;

const processesCore: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/ogcapi-processes-1/1.0/req/core',
  description: 'OGC API - Processes - Part 1: Core - Requirements Class "Core"',
  formats: [oas3_0],
  rules: {
    '/req/core/landingpage-op': rule.landingPageOp(doc('landingpage-op')),
    '/req/core/landingpage-success': rule.landingPageSuccess(doc('landingpage-success'), schema('landingPage')),
    '/req/core/conformance-op': rule.conformanceOp(doc('conformance-op')),
    '/req/core/conformance-success': rule.conformanceSuccess(doc('conformance-success'), schema('confClasses')),
    '/req/core/process-list': rule.processListOp(doc('process-list')),
    '/req/core/pl-limit-definition': rule.processListLimitDefinition(doc('pl-limit-definition')),
    // The 18-062r2 HTML swapped the anchors of this requirement and /req/job-list/job-list-success.
    '/req/core/process-list-success': rule.processListSuccess(
      'https://docs.ogc.org/is/18-062r2/18-062r2.html#req_job-list_job-list-success',
      schema('processList'),
    ),
    '/req/core/process': rule.processDescriptionOp(doc('process')),
    '/req/core/process#get': rule.processDescriptionGet(doc('process')),
    '/req/core/process-success': rule.processDescriptionSuccess(doc('process-success')),
    '/req/core/process-exception/no-such-process': rule.processExceptionNoSuchProcess(
      doc('process-exception-no-such-process'),
      schema('exception'),
    ),
    '/req/core/process-execute-op': rule.processExecuteOp(doc('process-execute-op')),
    '/req/core/process-execute-op#post': rule.processExecutePost(doc('process-execute-op')),
    '/req/core/process-execute-request': rule.processExecuteRequest(doc('process-execute-request'), schema('execute')),
    '/req/core/process-execute-sync-raw-value-one': rule.processExecuteSyncOne(doc('process-execute-sync-raw-value-one')),
    '/req/core/process-execute-sync-document': rule.processExecuteSyncDocument(doc('process-execute-sync-document'), schema('results')),
    '/req/core/process-execute-success-async': rule.processExecuteSuccessAsync(doc('process-execute-success-async'), schema('statusInfo')),
    '/req/core/job': rule.jobOp(doc('job')),
    '/req/core/job#get': rule.jobGet(doc('job')),
    '/req/core/job-success': rule.jobSuccess(doc('job-success'), schema('statusInfo')),
    '/req/core/job-exception-no-such-job': rule.jobExceptionNoSuchJob(doc('job-exception-no-such-job'), schema('exception')),
    '/req/core/job-results': rule.jobResultsOp(doc('job-results')),
    '/req/core/job-results#get': rule.jobResultsGet(doc('job-results')),
    '/req/core/job-results-async-document': rule.jobResultsAsyncDocument(doc('job-results-async-document'), schema('results')),
    '/req/core/job-results-exception/no-such-job': rule.jobResultsExceptionNoSuchJob(
      doc('job-results-exception_no-such-job'),
      schema('exception'),
    ),
    '/req/core/job-results-exception/results-not-ready': rule.jobResultsExceptionResultsNotReady(
      doc('job-results-exception_results-not-ready'),
      schema('exception'),
    ),
    '/req/core/job-results-failed': rule.jobResultsFailed(doc('job-results-failed'), schema('exception')),
  },
};

export default processesCore;
