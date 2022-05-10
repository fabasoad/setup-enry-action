import { downloadTool } from '@actions/tool-cache'
import { renameSync } from 'fs'
import { CLI_EXTENSION } from '../consts'
import Downloader from '../Downloader'

jest.mock('@actions/tool-cache', () => ({ downloadTool: jest.fn() }))
jest.mock('fs', () => ({ renameSync: jest.fn() }))

describe('Downloader', () => {
  it('should download successfully', async () => {
    const zipPathOld: string = 'yw86z9qw'
    const zipPathNew: string = zipPathOld + '.' + CLI_EXTENSION
    const url: string = '9r1y2ryp';
    (downloadTool as jest.Mock)
      .mockImplementation(() => Promise.resolve(zipPathOld))
    const d: Downloader = new Downloader()
    const actual: string = await d.download(url)
    expect((renameSync as jest.Mock).mock.calls.length).toBe(1)
    expect(renameSync).toHaveBeenCalledWith(zipPathOld, zipPathNew)
    expect(actual).toBe(zipPathNew)
  })

  afterEach(() => {
    (downloadTool as jest.Mock).mockClear();
    (renameSync as jest.Mock).mockClear()
  })
})
