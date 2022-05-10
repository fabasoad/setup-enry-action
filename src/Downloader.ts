import { downloadTool } from '@actions/tool-cache'
import fs from 'fs'
import { Logger } from 'winston'
import { CLI_EXTENSION, TOOL_NAME } from './consts'
import LoggerFactory from './LoggerFactory'

export default class Downloader implements IDownloader {
  private log: Logger = LoggerFactory.create('Downloader')

  async download(url: string): Promise<string> {
    this.log.info(`Downloading ${TOOL_NAME} from ${url}`)
    const zipPathOld: string = await downloadTool(url)
    this.log.info(`Downloaded to ${zipPathOld}`)
    const zipPathNew: string = zipPathOld + '.' + CLI_EXTENSION
    fs.renameSync(zipPathOld, zipPathNew)
    this.log.info(`Renamed to ${zipPathNew}`)
    return zipPathNew
  }
}
