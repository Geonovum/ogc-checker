import { Spectral } from '@stoplight/spectral-core';
import { clone } from 'ramda';
import { describe, expect, test } from 'vitest';
import exampleDoc from '../examples/processes.json';
import ruleset from './processes-core';
import { APPLICATION_JSON_TYPE } from '@geonovum/standards-checker';

const spectral = new Spectral();
spectral.setRuleset(ruleset);

describe('/req/core/landingpage-op', () => {
  test('Fails when landing page path is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths as Record<string, unknown>)['/'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/landingpage-op', 1);
  });
});

describe('/req/core/landingpage-success', () => {
  test('Fails when landing page success response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/'].get.responses as Record<string, unknown>)['200'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/landingpage-success', 1);
  });

  test('Fails when landing page response schema is invalid', async () => {
    const oasDoc = clone(exampleDoc);
    (oasDoc.components.schemas.landingPage as Record<string, unknown>).required = [];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/landingpage-success', 1);
  });
});

describe('/req/core/conformance-op', () => {
  test('Fails when conformance path is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths as Record<string, unknown>)['/conformance'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/conformance-op', 1);
  });
});

describe('/req/core/conformance-success', () => {
  test('Fails when conformance success response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/conformance'].get.responses as Record<string, unknown>)['200'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/conformance-success', 1);
  });

  test('Fails when conformance response schema is invalid', async () => {
    const oasDoc = clone(exampleDoc);
    (oasDoc.components.schemas.confClasses as Record<string, unknown>).required = [];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/conformance-success', 1);
  });
});

describe('/req/core/process-list-op', () => {
  test('Fails when processes path is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths as Record<string, unknown>)['/processes'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-list-op', 1);
  });
});

describe('/req/core/pl-limit-definition', () => {
  test('Fails when limit parameter schema is absent', async () => {
    const oasDoc = clone(exampleDoc);
    oasDoc.paths['/processes'].get.parameters.splice(0, 1);
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/pl-limit-definition', 1);
  });

  test('Fails when limit parameter schema is invalid', async () => {
    const oasDoc = clone(exampleDoc);
    (oasDoc.paths['/processes'].get.parameters[0] as Record<string, unknown>) = { type: 'string' };
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/pl-limit-definition', 1);
  });
});

describe('/req/core/process-list-success', () => {
  test('Fails when process list success response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/processes'].get.responses as Record<string, unknown>)['200'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-list-success', 1);
  });

  test('Fails when process list response schema is invalid', async () => {
    const oasDoc = clone(exampleDoc);
    (oasDoc.components.schemas.processList as Record<string, unknown>).required = [];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-list-success', 1);
  });
});

describe('/req/core/process-description-op', () => {
  test('Fails when process description path is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths as Record<string, unknown>)['/processes/{processID}'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-description-op', 1);
  });

  test('Fails when process description GET operation is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/processes/{processID}'] as Record<string, unknown>).get;
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-description-op#get', 1);
  });
});

describe('/req/core/process-description-success', () => {
  test('Fails when process description success response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/processes/{processID}'].get.responses as Record<string, unknown>)['200'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-description-success', 1);
  });
});

describe('/req/core/process-exception/no-such-process', () => {
  test('Fails when process description 404 response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/processes/{processID}'].get.responses as Record<string, unknown>)['404'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-exception/no-such-process', 1);
  });

  test('Fails when process description 404 response schema is invalid', async () => {
    const oasDoc = clone(exampleDoc);

    (oasDoc.paths['/processes/{processID}'].get.responses as Record<string, unknown>)['404'] = {
      description: 'Not Found',
      content: {
        [APPLICATION_JSON_TYPE]: {
          schema: { type: 'string' },
        },
      },
    };

    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-exception/no-such-process', 1);
  });
});

describe('/req/core/process-execute-op', () => {
  test('Fails when process execution path is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths as Record<string, unknown>)['/processes/{processID}/execution'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-execute-op', 1);
  });

  test('Fails when process execution POST operation is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/processes/{processID}/execution'] as Record<string, unknown>).post;
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-execute-op#post', 1);
  });
});

describe('/req/core/process-execute-request', () => {
  test('Fails when the execution request body is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/processes/{processID}/execution'].post as Record<string, unknown>).requestBody;
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-execute-request', 1);
  });

  test('Fails when the execution request body schema is invalid', async () => {
    const oasDoc = clone(exampleDoc);

    (oasDoc.paths['/processes/{processID}/execution'].post as Record<string, unknown>).requestBody = {
      description: 'Not Found',
      content: {
        [APPLICATION_JSON_TYPE]: {
          schema: { type: 'string' },
        },
      },
    };

    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-execute-request', 1);
  });

  test('Fails when the execution request body is optional', async () => {
    const oasDoc = clone(exampleDoc);
    (oasDoc.components.requestBodies.Execute as Record<string, unknown>).required = false;
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-execute-request', 1);
  });
});

describe('/req/core/process-execute-sync-one', () => {
  test('Fails when 200 response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/processes/{processID}/execution'].post.responses as Record<string, unknown>)['200'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-execute-sync-one', 1);
  });
});

describe('/req/core/process-execute-sync-many-json', () => {
  test('Fails when 200 response schema is missing', async () => {
    const oasDoc = clone(exampleDoc);

    (oasDoc.paths['/processes/{processID}/execution'].post.responses as Record<string, unknown>)['200'] = {
      description: 'OK',
      content: {
        [APPLICATION_JSON_TYPE]: {},
      },
    };

    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-execute-sync-many-json', 1);
  });
});

describe('/req/core/process-execute-success-async', () => {
  test('Fails when 201 response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/processes/{processID}/execution'].post.responses as Record<string, unknown>)['201'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-execute-success-async', 1);
  });

  test('Fails when 201 response schema is invalid', async () => {
    const oasDoc = clone(exampleDoc);

    (oasDoc.paths['/processes/{processID}/execution'].post.responses as Record<string, unknown>)['201'] = {
      description: 'Created',
      content: {
        [APPLICATION_JSON_TYPE]: {
          schema: { type: 'string' },
        },
      },
    };

    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/process-execute-success-async', 1);
  });
});

describe('/req/core/job-op', () => {
  test('Fails when job path is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths as Record<string, unknown>)['/jobs/{jobID}'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-op', 1);
  });

  test('Fails when job GET operation is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/jobs/{jobID}'] as Record<string, unknown>).get;
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-op#get', 1);
  });
});

describe('/req/core/job-success', () => {
  test('Fails when 200 response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/jobs/{jobID}'].get.responses as Record<string, unknown>)['200'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-success', 1);
  });
});

describe('/req/core/job-exception-no-such-job', () => {
  test('Fails when 404 response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/jobs/{jobID}'].get.responses as Record<string, unknown>)['404'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-exception-no-such-job', 1);
  });
});

describe('/req/core/job-results-op', () => {
  test('Fails when job results path is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths as Record<string, unknown>)['/jobs/{jobID}/results'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-results-op', 1);
  });

  test('Fails when job results GET operation is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/jobs/{jobID}/results'] as Record<string, unknown>).get;
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-results-op#get', 1);
  });
});

describe('/req/core/job-results-param-outputs', () => {
  test('Fails when outputs parameter is absent', async () => {
    const oasDoc = clone(exampleDoc);
    oasDoc.paths['/jobs/{jobID}/results'].get.parameters = oasDoc.paths['/jobs/{jobID}/results'].get.parameters.filter(
      (param: { $ref?: string }) => param.$ref !== '#/components/parameters/outputs'
    );
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-results-param-outputs', 1);
  });
});

describe('/req/core/job-result-op', () => {
  test('Fails when job result path is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths as Record<string, unknown>)['/jobs/{jobID}/results/{outputID}'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-result-op', 1);
  });

  test('Fails when job result GET operation is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/jobs/{jobID}/results/{outputID}'] as Record<string, unknown>).get;
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-result-op#get', 1);
  });
});

describe('/req/core/job-results-async-one', () => {
  test('Fails when 200 response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/jobs/{jobID}/results/{outputID}'].get.responses as Record<string, unknown>)['200'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-results-async-one', 1);
  });
});

describe('/req/core/job-results-async-many', () => {
  test('Fails when 200 response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/jobs/{jobID}/results'].get.responses as Record<string, unknown>)['200'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-results-async-many', 1);
  });
});

describe('/req/core/job-results-exception/invalid-query-parameter-value', () => {
  test('Fails when 400 response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/jobs/{jobID}/results'].get.responses as Record<string, unknown>)['400'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-results-exception/invalid-query-parameter-value', 1);
  });
});

describe('/req/core/job-results-exception/no-such-job', () => {
  test('Fails when 404 response is absent', async () => {
    const oasDoc = clone(exampleDoc);
    delete (oasDoc.paths['/jobs/{jobID}/results'].get.responses as Record<string, unknown>)['404'];
    const violations = await spectral.run(oasDoc);

    expect(violations).toContainViolation('/req/core/job-results-exception/no-such-job', 1);
  });
});
