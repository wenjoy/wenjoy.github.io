import { ComponentStory, ComponentMeta } from '@storybook/react';
import { User, Status, Role } from '.'

 export default {
  title: 'Example/User',
  component: User,
  argTypes: {
    status: {
      control: { type: 'inline-radio' },
      options: ['pending', 'voted'],
      mapping: {
        pending: 0,
        voted: 1
      }
    },
    role: {
      control: { type: 'inline-radio' },
      options: Object.keys(Role)
    }
  }
} as ComponentMeta<typeof User>

const Template: ComponentStory<typeof User> = (args) => <User {...args} />

export const Modertor = Template.bind({});
Modertor.args = {
  name: 'David',
  status: Status.Pending,
  role: Role.Moderator
}
