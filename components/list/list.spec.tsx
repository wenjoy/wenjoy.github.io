import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { List } from '.';

describe('List', () => {
  it('should renders empty result', () => {
    const data: any[] = []
    const { container } = render(<List data={data} />)
    expect(container).toMatchSnapshot()

    const noResult = screen.getByText('Nothing can be displayed')

    expect(noResult).toBeInTheDocument()
  })

  it('should renders List correctly', () => {
    const data: any[] = [{ name: 'test one' }]
    const { container } = render(<List data={data} />)
    const result = screen.getByText('test one')
    expect(result).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})