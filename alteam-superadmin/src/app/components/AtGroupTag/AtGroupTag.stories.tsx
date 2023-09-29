import { ComponentStory, ComponentMeta } from '@storybook/react'
import AtGroupTag from './AtGroupTag'

const Story: ComponentMeta<typeof AtGroupTag> = {
  component: AtGroupTag,
  title: 'Group Tag',
}

export default Story

const Template: ComponentStory<typeof AtGroupTag> = (args: any) => (
  <AtGroupTag {...args} />
)

export const GroupTag = Template.bind({})
GroupTag.args = {
  label: 'Group',
}
