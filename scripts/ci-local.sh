#!/usr/bin/env bash
# Runs the same checks as .github/workflows/ci.yml, in the same order.
# Keep this in step with that file: if a step is added there, add it here.
#
#   pnpm ci:local            full run, including the app build
#   pnpm ci:local --fast     skip the build (the slow step)

set -uo pipefail
cd "$(dirname "$0")/.."

FAST=0
[[ "${1:-}" == "--fast" ]] && FAST=1

FAILED=()
step() {
  local name="$1"; shift
  printf '  %-26s' "$name"
  local out
  if out="$("$@" 2>&1)"; then
    printf 'PASS\n'
  else
    printf 'FAIL\n'
    printf '%s\n' "$out" | tail -25 | sed 's/^/      /'
    FAILED+=("$name")
  fi
}

echo "CI (local) — mirroring .github/workflows/ci.yml"
echo

step "install --frozen-lockfile" pnpm install --frozen-lockfile
step "format:check"              pnpm format:check
step "lint"                      pnpm lint
step "typecheck"                 pnpm typecheck
step "registry:generate"         pnpm registry:generate

# CI fails when generation leaves the committed artifacts out of date.
printf '  %-26s' "generated files"
if git diff --exit-code --quiet -- __registry__ registry.json public/registry.json public/r; then
  printf 'PASS\n'
else
  printf 'FAIL\n'
  git diff --stat -- __registry__ registry.json public/registry.json public/r | sed 's/^/      /'
  echo '      fix: pnpm registry:build, then commit these files'
  FAILED+=("generated files")
fi

if [[ $FAST -eq 1 ]]; then
  printf '  %-26s%s\n' "build" "SKIPPED (--fast)"
else
  step "build" pnpm build
fi

echo
if [[ ${#FAILED[@]} -eq 0 ]]; then
  echo "All checks passed — CI would be green."
else
  printf 'FAILED: %s\n' "${FAILED[*]}"
  exit 1
fi
