import { ComponentStory, ComponentMeta } from '@storybook/react'
import AtCheckbox from './AtCheckbox'

const Story: ComponentMeta<typeof AtCheckbox> = {
  component: AtCheckbox,
  title: 'Checkbox',
}

export default Story

const Template: ComponentStory<typeof AtCheckbox> = (args: any) => (
  <AtCheckbox {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
