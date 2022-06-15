import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '.'

export default {
  title: 'Example/Card',
  component: Card,
} as ComponentMeta<typeof Card>;


const clickHandler = (point) => {
  alert('you clicked ' + point)
}

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Num = Template.bind({});
Num.args = {
  point: 0,
  clickHandler
}

export const Str = Template.bind({});
Str.args = {
  point: '?',
  clickHandler
}

export const Emoji = Template.bind({});
Emoji.args = {
  point: '☕',
  clickHandler
}