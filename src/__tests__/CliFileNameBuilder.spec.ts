import itParam from 'mocha-param'
import { type } from 'os'
import CliFileNameBuilder from '../CliFileNameBuilder'
import { TOOL_NAME } from '../consts'

jest.mock('os', () => ({ type: jest.fn() }))

describe('CliFileNameBuilder', () => {
  const expectedVersion: string = 'dy79bl7s'
  const items: string[] = ['Darwin', 'Linux']

  itParam('should build successfully (${value})',
    items, (item: string) => {
      (type as jest.Mock).mockImplementation(() => item)
      const b: CliFileNameBuilder = new CliFileNameBuilder(expectedVersion)
      expect(b.build()).toBe(
        `${TOOL_NAME}_v${expectedVersion}_${item.toLowerCase()}_amd64`)
    })

  afterEach(() => (type as jest.Mock).mockClear())
})
