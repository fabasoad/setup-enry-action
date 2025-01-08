#!/usr/bin/env sh

main() {
  if [ "${RUNNER_OS}" = "macOS" ]; then
    brew install git
  elif [ "${RUNNER_OS}" = "Windows" ]; then
    choco install git
  else
    os=$(grep "^ID=" "/etc/os-release" | cut -d '=' -f 2)
    if [ "${os}" = "alpine" ]; then
      apk --no-cache add git
    else
      apt update
      apt install -y git
    fi
  fi
}

main "$@"
