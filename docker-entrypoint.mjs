// Node entrypoint replacing the former shell script so the image can run on a
// shell-less distroless base as a non-root user.
//
//   serve | web   -> serve the built web UI on $PORT (default 8080)
//   anything else -> forward to the ogc-checker CLI (validate, --help, ...)

import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname, resolve } from 'node:path';

const [mode, ...rest] = process.argv.slice(2);

if (mode === 'serve' || mode === 'web') {
  const root = '/app/docs';
  const port = Number(process.env.PORT ?? 8080);

  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.map': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.wasm': 'application/wasm',
  };

  const sendFile = async (res, file, status = 200) => {
    const body = await readFile(file);
    res.writeHead(status, {
      'content-type': contentTypes[extname(file).toLowerCase()] ?? 'application/octet-stream',
    });
    res.end(body);
  };

  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
      const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
      let file = resolve(join(root, safePath));

      // Prevent path traversal outside the served root.
      if (file !== root && !file.startsWith(root + '/')) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      let info = await stat(file).catch(() => null);
      if (info?.isDirectory()) {
        file = join(file, 'index.html');
        info = await stat(file).catch(() => null);
      }
      if (info?.isFile()) {
        await sendFile(res, file);
        return;
      }

      // Single-page-application fallback.
      await sendFile(res, join(root, 'index.html'));
    } catch {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  });

  server.listen(port, () => {
    console.log(`ogc-checker web UI listening on :${port}`);
  });
} else {
  // CLI mode: process.argv already carries the user arguments, so the bundled
  // CLI parses them exactly as if it had been invoked directly.
  await import('/app/dist/cli.mjs');
}
