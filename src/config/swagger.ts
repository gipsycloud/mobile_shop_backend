import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My TypeScript API',
      version: '1.0.0',
      description: 'API documentation generated with Swagger + TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:3000', // update if needed
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to your route files
};

export const swaggerSpec = swaggerJsdoc(options);

function shouldHidePath(path: string, hideSubstrings: string[]): boolean {
  return hideSubstrings.some((s) => path.includes(s));
}

function filterSwaggerSpec(spec: any, opts: { hidePathSubstrings?: string[]; hideTags?: string[] } = {}): any {
  if (!spec || !spec.paths) return spec;

  const hidePathSubstrings = opts.hidePathSubstrings || ['/user', '/users'];
  const hideTags = (opts.hideTags || ['User']).map((t) => t.toLowerCase());

  const filteredPaths: Record<string, unknown> = {};

  for (const [path, methods] of Object.entries(spec.paths)) {
    // Hide if path contains any of the substrings (covers /api/users etc.)
    if (shouldHidePath(path, hidePathSubstrings)) continue;

    // Otherwise, inspect operations to see if any operation is tagged with hideTags.
    let keep = true;
    const methodObj = methods as Record<string, any>;
    for (const [, operation] of Object.entries(methodObj)) {
      if (!operation) continue;
      const tags: string[] = operation.tags || [];
      for (const tag of tags) {
        if (hideTags.includes(String(tag).toLowerCase())) {
          keep = false;
          break;
        }
      }
      if (!keep) break;
    }

    if (keep) filteredPaths[path] = methods;
  }

  return { ...spec, paths: filteredPaths };
}

export const setupSwagger = (app: Express): void => {
  // Default hide settings: hide any path that contains '/user' or '/users',
  // and hide operations tagged with 'User'. Adjust as needed.
  const filteredSpec = filterSwaggerSpec(swaggerSpec, {
    hidePathSubstrings: ['/user', '/users', '/api/user', '/api/users'],
    hideTags: ['User'],
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(filteredSpec));
};
