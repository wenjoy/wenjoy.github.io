import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Card } from './card'

describe('Card', () => {
  it('should render the card', () => {
    const { container } = render(<Card />)
    expect(container).toMatchSnapshot()
  })

  it('should render back of the card', () => {
    const { container } = render(<Card isBack />)
    expect(container).toMatchSnapshot()
    const content = screen.getByTestId('card')
    expect(content).toHaveTextContent('')
  })

  it('should display number rightly', () => {
    const { container } = render(<Card point={5} />)
    expect(container).toMatchSnapshot()
  })

  it('should display string rightly', () => {
    const { container } = render(<Card point="?" />)
    expect(container).toMatchSnapshot()
  })

  it('should display emoji rightly', () => {
    const { container } = render(<Card point="☕" />)
    expect(container).toMatchSnapshot()
  })

  it('should call clickHandler prop when clicked', () => {
    const handleClick = jest.fn()
    render(<Card clickHandler={handleClick} point={1} />)
    fireEvent.click(screen.getByText('1'))
    expect(handleClick).toHaveBeenCalledWith(1)
  })
})
