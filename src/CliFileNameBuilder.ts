import os from 'os'
import { TOOL_NAME } from './consts'

export default class CliFileNameBuilder implements ICliFileNameBuilder {
  private version: string

  constructor(version: string) {
    this.version = version
  }

  private getOS(): string {
    switch (os.type()) {
    case 'Darwin':
      return 'mac'
    case 'Linux':
      return 'linux'
    default:
      return 'windows'
    }
  }

  build(): string {
    return `${TOOL_NAME}-${this.getOS()}-${this.version}`
  }
}
