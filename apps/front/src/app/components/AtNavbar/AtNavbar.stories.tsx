import { ComponentStory, ComponentMeta } from '@storybook/react';
import AtNavbar from './AtNavbar';

const Story: ComponentMeta<typeof AtNavbar> = {
    component: AtNavbar,
    title: 'Navbar',
};

export default Story;

const Template: ComponentStory<typeof AtNavbar> = (args: any) => (
    <AtNavbar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
