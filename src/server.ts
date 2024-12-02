import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import fastify from 'fastify';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyStatic from '@fastify/static'

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = fastify();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.register(fastifyStatic, { root: browserDistFolder, wildcard: false })

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('*', (req, res) => {
  angularApp
    .handle(req.raw, {user: {username: "test"}})
    .then((response) =>{
      console.log('im here')
      response ? writeResponseToNodeResponse(response, res.raw) : null
    }
    )
    .catch(null);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = parseInt(process.env['PORT'] as string) || 4000;
  app.listen({port}, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */

export const reqHandler = createNodeRequestHandler(async (req, res) => {
  await app.ready()
  app.server.emit('request', req, res)
})
