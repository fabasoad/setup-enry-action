#!/usr/bin/env sh

main() {
  if [ "${RUNNER_OS}" = "macOS" ]; then
    brew install curl
  elif [ "${RUNNER_OS}" = "Windows" ]; then
    choco install curl
  else
    os=$(grep "^ID=" "/etc/os-release" | cut -d '=' -f 2)
    if [ "${os}" = "alpine" ]; then
      apk --no-cache add curl
    else
      apt install -y curl
    fi
  fi
}

main "$@"
