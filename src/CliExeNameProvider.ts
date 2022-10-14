import os from 'os'
import { TOOL_NAME } from './consts'

export default class CliExeNameProvider implements ICliExeNameProvider {
  private readonly version: string

  constructor(version: string) {
    this.version = version
  }

  getExeFileName(): string {
    switch (os.type()) {
    case 'Windows_NT':
      return `${TOOL_NAME}-${this.version}.exe`
    default:
      return TOOL_NAME
    }
  }
}
