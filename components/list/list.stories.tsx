import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List } from '.'
import { User, Role, Status } from '../user';

export default {
  title: 'Example/List',
  component: List,
  parameters: {}
} as ComponentMeta<typeof List>

const Template: ComponentStory<typeof List> = (args) => <List {...args} />

export const Empty = Template.bind({})

export const Items = Template.bind({})
Items.storyName = 'Default Items'
Items.args = {
  data: [
    { id: 1, name: 'David' },
    { id: 2, name: 'Tom' },
    { id: 3, name: 'Volta' },
  ]
}

export const CustomizedItems = Template.bind({})
CustomizedItems.args = {
  children: User,
  data: [
    { id: 1, name: 'David', role: Role.Moderator, status: Status.Voted },
    { id: 2, name: 'Tom', role: Role.Player, status: Status.Pending },
    { id: 3, name: 'Volta', role: Role.Player, status: Status.Pending }
  ]
}