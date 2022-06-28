import { render } from '@testing-library/react'
import { CardsList } from './cards-list'

describe('CardsList', () => {
  it('should render the cards list properly', () => {
    const { container } = render(
      <CardsList items={[{ id: '1', point: '5' }]} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render nothing if no items are provided', () => {
    const { container } = render(<CardsList items={[]} />)
    expect(container).toMatchSnapshot()
  })
})
