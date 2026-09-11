#!/bin/sh
set -e

# Two modes:
#   serve | web   -> serve the static web UI on $PORT (default 8080)
#   anything else -> forward to the ogc-checker CLI (validate, --help, ...)
case "$1" in
  serve | web)
    shift
    exec serve -s /app/docs -l "${PORT:-8080}" "$@"
    ;;
  *)
    exec node /app/dist/cli.mjs "$@"
    ;;
esac
