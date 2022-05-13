import os from 'os'
import { TOOL_NAME } from './consts'

export default class CliFileNameBuilder implements ICliFileNameBuilder {
  private readonly version: string

  constructor(version: string) {
    this.version = version
  }

  build(): string {
    return `${TOOL_NAME}_v${this.version}_${os.type().toLowerCase()}_amd64`
  }
}
