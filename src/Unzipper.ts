import { extractZip } from '@actions/tool-cache'
import path from 'path'
import { Logger } from 'winston'
import LoggerFactory from './LoggerFactory'

export default class Unzipper implements IUnzipper {
  private ez: typeof extractZip
  private log: Logger

  constructor(ez: typeof extractZip = extractZip) {
    this.ez = ez
    this.log = LoggerFactory.create('Unzipper')
  }

  async unzip(zipPath: string): Promise<string> {
    const folderPath: string = await this.ez(zipPath, path.dirname(zipPath))
    this.log.info(`Unzipped ${zipPath} to ${folderPath}`)
    return folderPath
  }
}
