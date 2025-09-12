# Setup Enry GitHub Action

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://stand-with-ukraine.pp.ua)
![GitHub release](https://img.shields.io/github/v/release/fabasoad/setup-enry-action?include_prereleases)
![functional-tests](https://github.com/fabasoad/setup-enry-action/actions/workflows/functional-tests.yml/badge.svg)
![linting](https://github.com/fabasoad/setup-enry-action/actions/workflows/linting.yml/badge.svg)
![security](https://github.com/fabasoad/setup-enry-action/actions/workflows/security.yml/badge.svg)

This action sets up an [enry](https://github.com/go-enry/enry) tool.

## Supported OS

<!-- prettier-ignore-start -->
| OS      |                    |
|---------|--------------------|
| Windows | :white_check_mark: |
| Linux   | :white_check_mark: |
| macOS   | :white_check_mark: |
<!-- prettier-ignore-end -->

## Prerequisites

The following tools have to be installed for successful work of this GitHub Action:
[curl](https://curl.se).

## Inputs

```yaml
- uses: fabasoad/setup-enry-action@v0
  with:
    # (Optional) enry version. Defaults to the latest version.
    version: "1.3.0"
    # (Optional) If "false" skips installation if enry is already installed.
    # If "true" installs enry in any case. Defaults to "false".
    force: "false"
    # (Optional) GitHub token that is used to send requests to GitHub API such
    # as getting latest release. Defaults to the token provided by GitHub Actions
    # environment.
    github-token: "${{ github.token }}"
```

## Outputs

<!-- prettier-ignore-start -->
| Name      | Description                       | Example |
|-----------|-----------------------------------|---------|
| installed | Whether enry was installed or not | `true`  |
<!-- prettier-ignore-end -->

## Example usage

```yaml
name: Setup Enry

on: push

jobs:
  example:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: fabasoad/setup-enry-action@v0
      - name: Run CLI
        run: |
          echo "Text format:"
          enry
          echo "JSON format:"
          enry --json | jq
```

### Result

```shell
Text format:
79.74% HTML
9.90% TypeScript
6.44% JavaScript
3.93% CSS
JSON format:
[
  {
    "color": "#e34c26",
    "language": "HTML",
    "percentage": "79.74%",
    "type": "unknown"
  },
  {
    "color": "#3178c6",
    "language": "TypeScript",
    "percentage": "9.90%",
    "type": "unknown"
  },
  {
    "color": "#f1e05a",
    "language": "JavaScript",
    "percentage": "6.44%",
    "type": "unknown"
  },
  {
    "color": "#563d7c",
    "language": "CSS",
    "percentage": "3.93%",
    "type": "unknown"
  }
]
```

## Contributions

![Alt](https://repobeats.axiom.co/api/embed/07ec3a28afc5fdf6240386ba4678dc78ba840a6d.svg "Repobeats analytics image")
