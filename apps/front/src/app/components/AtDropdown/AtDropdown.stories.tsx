import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SearchNormal1 } from 'iconsax-react'
import AtDropdown from './AtDropdown'

const Story: ComponentMeta<typeof AtDropdown> = {
  component: AtDropdown,
  title: 'Dropdown',
}

export default Story

const Template: ComponentStory<typeof AtDropdown> = (args: any) => {
  const items = [
    { id: 1, label: 'Sketch' },
    { id: 2, label: 'Software Engineering' },
    { id: 3, label: 'Cyber Security' },
    { id: 4, label: 'SWOT Analysis' },
    { id: 5, label: 'Lorem Ipsum' },
  ]

  return (
    <AtDropdown
      {...args}
      placeholder={'Search in most recent'}
      startIcon={args.startIcon ? <SearchNormal1 /> : null}
      listItems={items}
    />
  )
}

export const DropdownMedium = Template.bind({})
DropdownMedium.args = {
  label: 'Email',
  required: true,
  disabled: false,
  size: 'medium',
  startIcon: false,
}

export const DropdownSmall = Template.bind({})
DropdownSmall.args = {
  label: 'Email',
  required: true,
  disabled: false,
  size: 'small',
  startIcon: false,
}
