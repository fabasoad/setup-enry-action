import Cache from './Cache'
import Downloader from './Downloader'
import ExecutableFileFinder from './ExecutableFileFinder'
import Unzipper from './Unzipper'
import UrlProvider from './UrlProvider'

export default class Installer implements IInstaller {
  private _urlProvider: IUrlProvider
  private _downloader: IDownloader
  private _unzipper: IUnzipper
  private _fileFinder: IExecutableFileFinder
  private _cache: ICache

  constructor(
    version: string,
    urlProvider: IUrlProvider = new UrlProvider(version),
    downloader: IDownloader = new Downloader(),
    unzipper: IUnzipper = new Unzipper(),
    fileFinder: IExecutableFileFinder = new ExecutableFileFinder(version),
    cache: ICache = new Cache(version)) {
    this._urlProvider = urlProvider
    this._downloader = downloader
    this._unzipper = unzipper
    this._fileFinder = fileFinder
    this._cache = cache
  }

  public async install(): Promise<void> {
    const url: string = this._urlProvider.getUrl()
    const zipPath: string = await this._downloader.download(url)
    const folderPath: string = await this._unzipper.unzip(zipPath)
    const execFilePath: string = this._fileFinder.find(folderPath)
    this._cache.cache(execFilePath)
  }
}
