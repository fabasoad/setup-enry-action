# Setup Enry GitHub Action

![GitHub release](https://img.shields.io/github/v/release/fabasoad/setup-enry-action?include_prereleases) ![Unit Tests](https://github.com/fabasoad/setup-enry-action/workflows/Unit%20Tests/badge.svg) ![Functional Tests](https://github.com/fabasoad/setup-enry-action/workflows/Functional%20Tests/badge.svg) ![Lint](https://github.com/fabasoad/setup-enry-action/workflows/Lint/badge.svg) ![Security Tests](https://github.com/fabasoad/setup-enry-action/workflows/Security%20Tests/badge.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/fabasoad/setup-enry-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/setup-enry-action/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fabasoad/setup-enry-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/setup-enry-action/context:javascript) [![Maintainability](https://api.codeclimate.com/v1/badges/f3a3f3a8d855a5a5b7dc/maintainability)](https://codeclimate.com/github/fabasoad/setup-enry-action/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f3a3f3a8d855a5a5b7dc/test_coverage)](https://codeclimate.com/github/fabasoad/setup-enry-action/test_coverage) [![Known Vulnerabilities](https://snyk.io/test/github/fabasoad/setup-enry-action/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fabasoad/setup-enry-action?targetFile=package.json)

[Setup Enry](https://github.com/fabasoad/setup-enry-action) GitHub Action.

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
```
