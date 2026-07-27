import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { oas3_0 } from './formats';
import * as rule from './processes-rules';
import { SCHEMAS_URI_PREFIX } from './processes-v1-core';

export const OGC_API_PROCESSES_V1_JOB_LIST_URI = 'http://www.opengis.net/spec/ogcapi-processes-1/1.0/conf/job-list';

export const OGC_API_PROCESSES_V1_JOB_LIST_DOC_URI = 'https://docs.ogc.org/is/18-062r2/18-062r2.html#req_job-list_';

const doc = (anchor: string) => OGC_API_PROCESSES_V1_JOB_LIST_DOC_URI + anchor;

// 1.0 defines both duration bounds as arrays of integers (2.0 uses plain integers).
const duration = rule.jobListDurationDefinition({ type: 'array', items: { type: 'integer' } });

const processesJobList: RulesetDefinition = {
  documentationUrl: 'http://www.opengis.net/spec/ogcapi-processes-1/1.0/req/job-list',
  description: 'OGC API - Processes - Part 1: Core - Requirements Class "Job list"',
  formats: [oas3_0],
  rules: {
    '/req/job-list/job-list-op': rule.jobListOp(doc('job-list-op')),
    '/req/job-list/type-definition': rule.jobListTypeDefinition(doc('type-definition')),
    '/req/job-list/processID-definition': rule.jobListProcessIdDefinition(doc('processID-definition')),
    '/req/job-list/status-definition': rule.jobListStatusDefinition(doc('status-definition')),
    '/req/job-list/datetime-definition': rule.jobListDatetimeDefinition(doc('datetime-definition')),
    '/req/job-list/duration-definition#minDuration': duration.minDuration(doc('duration-definition')),
    '/req/job-list/duration-definition#maxDuration': duration.maxDuration(doc('duration-definition')),
    '/req/job-list/limit-definition': rule.jobListLimitDefinition(doc('limit-definition')),
    // The 18-062r2 HTML swapped the anchors of this requirement and /req/core/process-list-success.
    '/req/job-list/job-list-success': rule.jobListSuccess(
      'https://docs.ogc.org/is/18-062r2/18-062r2.html#req_core_process-list-success',
      `${SCHEMAS_URI_PREFIX}jobList.yaml`,
    ),
  },
};

export default processesJobList;
