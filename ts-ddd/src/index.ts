import { buildApp } from './interfaces/http/router.js';
import { env } from './config/env.js';

async function main() {
  const app = buildApp();
  const port = env.port;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`HTTP server started on port ${port}`);
  });
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});