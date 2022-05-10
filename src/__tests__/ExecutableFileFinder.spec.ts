import { sync } from 'glob'
import itParam from 'mocha-param'
import path from 'path'
import { TOOL_NAME } from '../consts'
import ExecutableFileFinder from '../ExecutableFileFinder'

jest.mock('glob', () => ({ sync: jest.fn() }))

interface IFixture {
  message: string
  suffix: string
}

describe('ExecutableFileFinder', () => {
  const SUFFIX: string = '3ttg37ne'
  const items: IFixture[] = [{
    message: 'There are more than 1 execution file has been found',
    suffix: SUFFIX
  }, {
    message: 'Execution file has not been found',
    suffix: 'u4h0t03e'
  }]

  it('should find successfully', () => {
    const folderPath: string = '4se2ov6f'
    const files: string[] = [`1clx8w43${SUFFIX}`, '1clx8w43'];
    (sync as jest.Mock).mockImplementation(() => files)
    const finder: ExecutableFileFinder = new ExecutableFileFinder('1uu02vbj', {
      getExeFileName: (): string => SUFFIX
    })
    const actual: string = finder.find(folderPath)
    expect((sync as jest.Mock).mock.calls.length).toBe(1)
    expect(sync).toHaveBeenCalledWith(
      `${folderPath}${path.sep}**${path.sep}${TOOL_NAME}*`)
    expect(actual).toBe(files[0])
  })

  itParam('should throw error (${value.message})', items, (item: IFixture) => {
    const folderPath: string = '4se2ov6f'
    const files: string[] = [`1clx8w43${SUFFIX}`, `gt11c1zr${SUFFIX}`];
    (sync as jest.Mock).mockImplementation(() => files)
    const finder: ExecutableFileFinder = new ExecutableFileFinder('1uu02vbj', {
      getExeFileName: (): string => item.suffix
    })
    try {
      finder.find(folderPath)
    } catch (e) {
      expect((<Error>e).message).toContain(item.message)
      expect((sync as jest.Mock).mock.calls.length).toBe(1)
      expect(sync).toHaveBeenCalledWith(
        `${folderPath}${path.sep}**${path.sep}${TOOL_NAME}*`)
      return
    }
    fail()
  })

  afterEach(() => (sync as jest.Mock).mockClear())
})
