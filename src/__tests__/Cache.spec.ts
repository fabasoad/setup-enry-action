import { addPath } from '@actions/core'
import { cacheDir } from '@actions/tool-cache'
import { chmodSync } from 'fs'
import path from 'path'
import Cache from '../Cache'

jest.mock('@actions/core', () => ({ addPath: jest.fn() }));
jest.mock('@actions/tool-cache', () => ({ cacheDir: jest.fn() }));
jest.mock('fs', () => ({ chmodSync: jest.fn() }));

describe('Cache', () => {
  it('should cache successfully', async () => {
    const version: string = 'ey1r6c00'
    const exeFileName: string = 'O7DF0gox'
    const getExeFileNameMock: jest.Mock<string, []> = jest.fn(() => exeFileName)
    const folderPath: string = '1ef84ehe'
    const execFilePath: string = path.join(folderPath, 'm8x9p1sw')
    const cachedPath: string = '1r4wn1iw';
    (cacheDir as jest.Mock)
      .mockImplementation(() => Promise.resolve(cachedPath))
    const cache: Cache = new Cache(version, {
      getExeFileName: getExeFileNameMock
    })
    await cache.cache(execFilePath)

    expect(getExeFileNameMock.mock.calls.length).toBe(1)
    expect((chmodSync as jest.Mock).mock.calls.length).toBe(1)
    expect(chmodSync).toHaveBeenCalledWith(execFilePath, '777')
    expect((addPath as jest.Mock).mock.calls.length).toBe(1)
    expect((cacheDir as jest.Mock).mock.calls.length).toBe(1)
    expect(cacheDir).toHaveBeenCalledWith(folderPath, exeFileName, version)
  })

  afterEach(() => {
    (addPath as jest.Mock).mockClear(),
    (cacheDir as jest.Mock).mockClear(),
    (chmodSync as jest.Mock).mockClear()
  })
})
