import ExecutableFileFinder from '../ExecutableFileFinder'
import fs from 'fs';
import itParam from 'mocha-param';

const TEST_EXE = 'file.exe'

jest.mock('fs', () => ({
  readdirSync: jest.fn((dirPath: string) => {
    switch (dirPath) {
    case 'folder1': return ['file.txt', 'folder2']
    case 'folder1/folder2': return [TEST_EXE]
    default: return []
    }
  }),
  statSync: jest.fn((dirPath: string) => ({
    isDirectory: jest.fn(() => dirPath.endsWith('folder1') ||
        dirPath.endsWith('folder2'))
  }))
}))

describe('ExecutableFileFinder::find', () => {
  let finder: ExecutableFileFinder

  beforeEach(() => {
    (fs.readdirSync as jest.Mock).mockClear();
    (fs.statSync as jest.Mock).mockClear()
    const cliName = '1clx8w43'
    finder = new ExecutableFileFinder(cliName, {
      getExeFileName: () => TEST_EXE
    })
  })

  it('should find successfully', () => {
    const dirPath = 'folder1'
    const actual: string = finder.find(dirPath)
    expect(actual).toBe(`folder1/folder2/${TEST_EXE}`)
  })

  itParam(
    'should not find successfully (${value})',
    ['folder3', null],
    (dirPath: string) => {
      expect(() => finder.find(dirPath)).toThrow(
        `Execution file has not been found under ${dirPath} folder`)
    })
})
