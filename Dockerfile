# syntax=docker/dockerfile:1@sha256:ecfaec9ed6d810b56388c508f4121597bfbba70d41a6dfeee4d8cad5f295fc32

# Two runtime images from one build:
#
#   docker build --target cli -t <name>-cli .   # the CLI (default target)
#   docker build --target web -t <name>-web .   # the web UI, served by Caddy
#
# Base images are pinned to an exact version and digest; Renovate keeps them
# current. The Node major (24) appears in both the build image tag and the
# distroless image name, so bump the two together.

########################################
# Build CLI + web bundle
########################################
FROM node:24.21.0-bookworm-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6 AS build

# Enable the pnpm version pinned in package.json ("packageManager").
RUN corepack enable

WORKDIR /app

# Install dependencies first (better layer caching).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Same steps as the package.json "build" script: the CLI bundle goes to dist/,
# the web UI to docs/. `--base=./` replaces the GitHub Pages base path so the
# UI can be served from the container root.
RUN pnpm exec tsc -b \
 && pnpm run build:cli \
 && pnpm exec vite build --base=./

# Drop devDependencies so only the CLI's runtime deps reach the cli image.
RUN pnpm prune --prod

########################################
# Web UI: static files served by Caddy
########################################
FROM caddy:2.11.4-alpine@sha256:6aeddd44c3078b0f9a35206472a11420648a79c184603ef95957d0a20044cb2b AS web

# The UI routes on the URL hash, so any other path is redirected to the root
# (a missing asset stays a 404). The admin API and config persistence are
# disabled so Caddy needs no writable state directory and can run as a
# non-root user.
COPY <<'EOF' /etc/caddy/Caddyfile
{
	admin off
	persist_config off
	auto_https off
}

:{$PORT:8080} {
	root * /srv
	encode zstd gzip

	@unknown {
		not file {path} {path}/index.html
		not path /assets/*
	}
	redir @unknown /

	file_server
}
EOF

COPY --from=build /app/docs /srv

USER 65532:65532
EXPOSE 8080

########################################
# CLI: distroless, non-root Node runtime
########################################
FROM gcr.io/distroless/nodejs24-debian13:nonroot@sha256:bb6b03d81066993293a10feda7250e8e1cc034035fe9b61cfceededa7c8bf04d AS cli

ENV NODE_ENV=production

WORKDIR /app

# dist/ holds the CLI bundle (cli.mjs), which imports its runtime deps from node_modules/.
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

ENTRYPOINT ["/nodejs/bin/node", "/app/dist/cli.mjs"]
CMD ["--help"]
