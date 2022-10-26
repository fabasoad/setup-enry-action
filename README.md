# Setup Enry GitHub Action

![GitHub release](https://img.shields.io/github/v/release/fabasoad/setup-enry-action?include_prereleases)
![Functional Tests](https://github.com/fabasoad/setup-enry-action/workflows/Functional%20Tests/badge.svg)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/fabasoad/setup-enry-action/main.svg)](https://results.pre-commit.ci/latest/github/fabasoad/setup-enry-action/main)

This action sets up an [enry](https://github.com/src-d/enry) tool.

## Inputs

| Name    | Required | Description                                                                   | Default | Possible values        |
|---------|----------|-------------------------------------------------------------------------------|---------|------------------------|
| version | No       | Enry version that can be found [here](https://github.com/src-d/enry/releases) | `2.1.0` | `1.7.3`, `2.0.0`, etc. |

## Usage

```yaml
name: Setup Enry

on: push

jobs:
  job_1:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@main
      - uses: fabasoad/setup-enry-action@main
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
