import path from 'path'
import Unzipper from '../Unzipper'

describe('Unzipper', () => {
  it('should unzip successfully', async () => {
    const folderPath: string = 'y3zlo92h'
    const expected: string = 'y715q9w9'
    const zipPath: string = path.join(folderPath, 'k5qf395o')
    const extractZipMocked: jest.Mock<
      Promise<string>, [file: string, dest?: string]> =
      // eslint-disable-next-line no-unused-vars
      jest.fn((file: string, dest?: string) => Promise.resolve(expected))
    const unzipper: Unzipper = new Unzipper(extractZipMocked)
    const actual: string = await unzipper.unzip(zipPath)
    expect(extractZipMocked.mock.calls.length).toBe(1)
    expect(extractZipMocked.mock.calls[0][0]).toBe(zipPath)
    expect(extractZipMocked.mock.calls[0][1]).toBe(folderPath)
    expect(actual).toBe(expected)
  })
})
