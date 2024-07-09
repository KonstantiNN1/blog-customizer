import type { Meta, StoryObj } from '@storybook/react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
  	title: 'Components/ArrowButton',
  	argTypes: {
    	onClick: { action: 'clicked' },
  	},
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
  	render: (args) => <ArrowButton {...args} />,
};