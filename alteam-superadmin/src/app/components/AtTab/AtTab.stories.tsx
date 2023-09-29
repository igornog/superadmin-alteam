import { ComponentStory, ComponentMeta } from '@storybook/react'
import AtTab from './AtTab'

const Story: ComponentMeta<typeof AtTab> = {
  component: AtTab,
  title: 'Tab',
}

export default Story

const Template: ComponentStory<typeof AtTab> = (args: any) => (
  <AtTab {...args} />
)

export const Tab = Template.bind({})
Tab.args = {
  label: 'Inactive Clients',
}

export const TabWithBadge = Template.bind({})
TabWithBadge.args = {
  label: 'Inactive Clients',
  badge: 11,
}

export const TabActive = Template.bind({})
TabActive.args = {
  label: 'Inactive Clients',
  badge: 11,
  active: true,
}
