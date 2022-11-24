import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import AtCard from './AtCard'

const Story: ComponentMeta<typeof AtCard> = {
  component: AtCard,
  title: 'Card (wip)',
}

export default Story

const Template: ComponentStory<typeof AtCard> = (args: any) => (
  <AtCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
