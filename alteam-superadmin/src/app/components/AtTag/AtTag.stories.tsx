import { ComponentStory, ComponentMeta } from '@storybook/react'
import AtTag from './AtTag'

const Story: ComponentMeta<typeof AtTag> = {
  component: AtTag,
  title: 'Tags',
}

export default Story

const Template: ComponentStory<typeof AtTag> = (args: any) => (
  <AtTag {...args} />
)

export const Tag = Template.bind({})
Tag.args = {
  label: 'Prototyping',
  delete: true,
}
