# syntax=docker/dockerfile:1

########################################
# Stage 1 — build CLI + web bundle
########################################
FROM node:24-bookworm-slim AS build

# Enable the pnpm version pinned in package.json ("packageManager").
RUN corepack enable

WORKDIR /app

# Install dependencies first (better layer caching).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the sources and build.
COPY . .

# Build order matches the package.json "build" script: build:cli empties dist/
# first, then vite build (emptyOutDir disabled) adds the web bundle alongside
# cli.mjs. `--base=./` makes the web assets path-independent so the SPA can be
# served from the container root by any static server.
RUN pnpm exec tsc -b \
 && pnpm run build:cli \
 && pnpm exec vite build --base=./

# Drop devDependencies so only runtime deps are carried into the final image.
RUN pnpm prune --prod

########################################
# Stage 2 — distroless non-root runtime
########################################
FROM gcr.io/distroless/nodejs24-debian13:nonroot AS runtime

ENV NODE_ENV=production \
    PORT=8080

WORKDIR /app

# Bring over the built artefacts and their runtime dependencies.
# dist/ holds the CLI bundle (cli.mjs); docs/ holds the built web UI.
COPY --from=build /app/dist ./dist
COPY --from=build /app/docs ./docs
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY docker-entrypoint.mjs ./docker-entrypoint.mjs

EXPOSE 8080

# The distroless base already runs as the non-root "nonroot" user (uid 65532)
# and has no shell, so dispatch through a Node entrypoint instead of a script.
ENTRYPOINT ["/nodejs/bin/node", "/app/docker-entrypoint.mjs"]
# Default: print the CLI help. Pass `serve` to launch the web UI instead.
CMD ["--help"]
