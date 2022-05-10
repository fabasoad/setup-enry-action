import { extractTar } from '@actions/tool-cache'
import path from 'path'
import { Logger } from 'winston'
import LoggerFactory from './LoggerFactory'

export default class Unzipper implements IUnzipper {
  private readonly untar: typeof extractTar
  private log: Logger

  constructor(untar: typeof extractTar = extractTar) {
    this.untar = untar
    this.log = LoggerFactory.create('Unzipper')
  }

  async unzip(zipPath: string): Promise<string> {
    const folderPath: string = await this.untar(zipPath, path.dirname(zipPath))
    this.log.info(`Unzipped ${zipPath} to ${folderPath}`)
    return folderPath
  }
}
