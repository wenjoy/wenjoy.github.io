import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardsList from '.'

export default {
  title: 'Example/CardsList',
  component: CardsList,
} as ComponentMeta<typeof CardsList>;

const Template: ComponentStory<typeof CardsList> = (args) => <CardsList {...args} />;

export const Default = Template.bind({});

Default.args = {
  items: [
    {id: '1', point: '1'},
    {id: '2', point: '3'},
    {id: '3', point: '?'},
  ]
}