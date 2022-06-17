import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List } from '.'

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
  data: [
    { id: 1, name: 'David' },
    { id: 2, name: 'Tom' },
    { id: 3, name: 'Volta' },
  ]
}