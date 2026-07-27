import { Rulesets } from '@geonovum/standards-checker/ui';
import featuresCore, { OGC_API_FEATURES_CORE_URI } from './features-core';
import featuresCrs, { OGC_API_FEATURES_CRS_URI } from './features-crs';
import featuresGeoJson, { OGC_API_FEATURES_GEOJSON_URI } from './features-geojson';
import featuresOas30, { OGC_API_FEATURES_OAS30_URI } from './features-oas30';
import processesV1Core, { OGC_API_PROCESSES_V1_CORE_URI } from './processes-v1-core';
import processesV1JobList, { OGC_API_PROCESSES_V1_JOB_LIST_URI } from './processes-v1-job-list';
import processesV1Json, { OGC_API_PROCESSES_V1_JSON_URI } from './processes-v1-json';
import processesV1OgcProcessDescription, { OGC_API_PROCESSES_V1_OGC_PROCESS_DESCRIPTION_URI } from './processes-v1-ogc-process-description';
import processesCore, { OGC_API_PROCESSES_CORE_URI } from './processes-v2-core';
import processesJobList, { OGC_API_PROCESSES_JOB_LIST_URI } from './processes-v2-job-list';
import processesJson, { OGC_API_PROCESSES_JSON_URI } from './processes-v2-json';
import processOgcProcessDescription, { OGC_API_PROCESSES_OGC_PROCESS_DESCRIPTION_URI } from './processes-v2-ogc-process-description';
import recordsJson, { OGC_API_RECORDS_JSON_URI } from './records-json';

// Features - Part 1 and Part 2
export const featuresRulesets: Rulesets = {
  [OGC_API_FEATURES_CORE_URI]: featuresCore,
  [OGC_API_FEATURES_OAS30_URI]: featuresOas30,
  [OGC_API_FEATURES_GEOJSON_URI]: featuresGeoJson,
  [OGC_API_FEATURES_CRS_URI]: featuresCrs,
};

// Processes - Part 1, version 1.0 (18-062r2)
export const processesV1Rulesets: Rulesets = {
  [OGC_API_PROCESSES_V1_CORE_URI]: processesV1Core,
  [OGC_API_PROCESSES_V1_JOB_LIST_URI]: processesV1JobList,
  [OGC_API_PROCESSES_V1_JSON_URI]: processesV1Json,
  [OGC_API_PROCESSES_V1_OGC_PROCESS_DESCRIPTION_URI]: processesV1OgcProcessDescription,
};

// Processes - Part 1, version 2.0 (18-062r3, draft)
export const processesV2Rulesets: Rulesets = {
  [OGC_API_PROCESSES_CORE_URI]: processesCore,
  [OGC_API_PROCESSES_JOB_LIST_URI]: processesJobList,
  [OGC_API_PROCESSES_JSON_URI]: processesJson,
  [OGC_API_PROCESSES_OGC_PROCESS_DESCRIPTION_URI]: processOgcProcessDescription,
};

// Records - Part 1
export const recordsRulesets: Rulesets = {
  [OGC_API_RECORDS_JSON_URI]: recordsJson,
};
