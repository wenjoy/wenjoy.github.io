import { render, screen } from '@testing-library/react'
import Card from '.'
import '@testing-library/jest-dom'

describe('Card', () => {
    it('should render the card', () => {
        const { container } = render(<Card />)
        expect(container).toMatchSnapshot()
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
})