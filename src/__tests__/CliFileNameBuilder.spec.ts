import itParam from 'mocha-param'
import { type } from 'os'
import CliFileNameBuilder from '../CliFileNameBuilder'
import { TOOL_NAME } from '../consts'

jest.mock('os', () => ({ type: jest.fn() }))

interface IFixture {
  os1: string
  os2: string
}

describe('CliFileNameBuilder', () => {
  const expectedVersion: string = 'dy79bl7s'
  const items: IFixture[] = [{
    os1: 'Windows_NT',
    os2: 'windows'
  }, {
    os1: 'Darwin',
    os2: 'mac'
  }, {
    os1: 'Linux',
    os2: 'linux'
  }]

  itParam('should build successfully (${value.os1})',
    items, (item: IFixture) => {
      (type as jest.Mock).mockImplementation(() => item.os1)
      const b: CliFileNameBuilder = new CliFileNameBuilder(expectedVersion)
      expect(b.build()).toBe(
        `${TOOL_NAME}_v${expectedVersion}_${item.os2}_amd64`)
    })

  afterEach(() => (type as jest.Mock).mockClear())
})
