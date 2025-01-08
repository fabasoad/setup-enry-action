#!/usr/bin/env sh

main() {
  repo="${1}"
  token="${2}"

  version=$(curl -sL \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${token}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/${repo}/tags" \
    | jq -r '.[0].name | sub("^v"; "")')
  echo "version=${version}" >> "$GITHUB_OUTPUT"
}

main "$@"
