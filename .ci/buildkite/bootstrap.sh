#!/usr/bin/env bash

set -euo pipefail

source "$(dirname "${0}")/util.sh"

echo "--- yarn install and bootstrap"
yarn kbn bootstrap --verbose

# TODO add permissions for gsutil and enable this where needed
###
### upload ts-refs-cache artifacts as quickly as possible so they are available for download
###
echo "--- Upload ts-refs-cache"
if [[ "${BUILD_TS_REFS_CACHE_CAPTURE:-}" == "true" ]]; then
  cd "$KIBANA_DIR/target/ts_refs_cache"
  gsutil cp "*.zip" 'gs://kibana-ci-ts-refs-cache/'
  cd "$KIBANA_DIR"
fi

if [[ "${DISABLE_BOOTSTRAP_VALIDATION:-}" != "true" ]]; then
  verify_no_git_changes 'yarn kbn bootstrap'
fi
