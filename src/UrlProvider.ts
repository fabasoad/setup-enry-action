import CliFileNameBuilder from './CliFileNameBuilder'
import { CLI_EXTENSION, CLI_URL } from './consts'

export default class UrlProvider implements IUrlProvider {
  private builder: ICliFileNameBuilder
  private readonly version: string

  constructor(
    version: string,
    builder: ICliFileNameBuilder = new CliFileNameBuilder(version)) {
    this.version = version
    this.builder = builder
  }

  getUrl(): string {
    return `${CLI_URL}/${this.version}/${this.builder.build()}.${CLI_EXTENSION}`
  }
}
