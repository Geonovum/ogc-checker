import { resolveHttp } from '@stoplight/json-ref-readers';
import { extname } from '@stoplight/path';
import { RulesetFunction } from '@stoplight/spectral-core';
import { Json, Yaml } from '@stoplight/spectral-parsers';
import { Resolver } from '@stoplight/spectral-ref-resolver';
import { APPLICATION_JSON_TYPE } from '../constants';
import { OpenAPIV3_0 } from '../openapi-types';
import { errorMessage, matchSchema } from '../util';

interface Options {
  schema?: OpenAPIV3_0.SchemaObject;
  schemaUri?: string;
  mediaType?: string;
}

const resolver = new Resolver({
  resolvers: {
    http: { resolve: resolveHttp },
    https: { resolve: resolveHttp },
  },
  parseResolveResult: opts => {
    const source = opts.targetAuthority.href().replace(/\/$/, '');
    const parser = extname(source) === '.json' ? Json : Yaml;
    const parseResult = parser.parse(opts.result);

    return Promise.resolve({
      result: parseResult.data,
    });
  },
});

const schemaCache = new Map<string, Promise<OpenAPIV3_0.SchemaObject>>();

const fetchAndResolveSchema = (schemaUri: string): Promise<OpenAPIV3_0.SchemaObject> => {
  const cached = schemaCache.get(schemaUri);

  if (cached) {
    return cached;
  }

  const result = fetch(schemaUri)
    .then(response => response.text())
    .then(responseText => Yaml.parse(responseText).data)
    .then(responseSchema => resolver.resolve(responseSchema, { baseUri: schemaUri }).then(r => r.result));

  schemaCache.set(schemaUri, result);
  return result;
};

const hasSchemaMatch: RulesetFunction<OpenAPIV3_0.ResponseObject | OpenAPIV3_0.RequestBodyObject, Options> = async (
  input,
  options,
  context
) => {
  if (!input || (!options.schema && !options.schemaUri)) {
    return;
  }

  const mediaType = options.mediaType ?? APPLICATION_JSON_TYPE;
  const content = input.content ? input.content[mediaType] : undefined;

  if (!content) {
    return;
  }

  const schema = content.schema as OpenAPIV3_0.SchemaObject | undefined;

  if (!schema) {
    return errorMessage(`Response schema for media type "${mediaType}" is missing.`, [...context.path, 'content', mediaType]);
  }

  let refSchema = options.schema;

  if (options.schemaUri) {
    refSchema = await fetchAndResolveSchema(options.schemaUri);
  }

  if (!refSchema) {
    return;
  }

  const errors = matchSchema(schema, refSchema);

  if (errors.length > 0) {
    return errorMessage(`Response schema is not compatible. ` + errors.join(' '), [...context.path, 'content', mediaType]);
  }
};

export default hasSchemaMatch;
