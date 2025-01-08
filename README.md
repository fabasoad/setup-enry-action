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

## Usage

```yaml
name: Setup Enry

on: push

jobs:
  example:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: fabasoad/setup-enry-action@v0
      - name: Run CLI
        run: enry
```

### Result

```shell
Run enry
59.57%  HTML
21.29%  JavaScript
14.25%  TypeScript
4.89%   CSS
```

### Useful examples

#### Convert to json

```shell
# Simple output
enry
59.57%  HTML
21.29%  JavaScript
14.25%  TypeScript
4.89%   CSS

# Convert to JSON
echo "{$(enry | sed 's/^\(.*\)\t\(.*\)$/\"\2\":\"\1\"/' | paste -sd "," -)}"
{"HTML":"59.57%","JavaScript":"21.29%","TypeScript":"14.25%","CSS":"4.89%"}
```
