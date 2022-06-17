import { render } from '@testing-library/react'
import { User, Status, Role } from '.';

describe('User', async() => {
  it('should renders User correctly', () => {
    const { container } = render(<User name="David" status={Status.Pending} role={Role.Moderator} />)
 expect(container).toMatchSnapshot() })
 })