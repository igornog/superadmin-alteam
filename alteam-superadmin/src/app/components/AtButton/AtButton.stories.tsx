import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TickSquare } from 'iconsax-react'
import React from 'react'
import AtButton, { AtButtonKind, AtButtonVariant } from './AtButton'

const Story: ComponentMeta<typeof AtButton> = {
  component: AtButton,
  title: 'Buttons',
  argTypes: {
    kind: {
      options: [
        AtButtonKind.Default,
        AtButtonKind.Danger,
        AtButtonKind.Success,
      ],
      control: { type: 'select' },
    },
    variant: {
      control: { disable: true },
    },
  },
}

export default Story

// Template BUTTON
const Template: ComponentStory<typeof AtButton> = (args: any) => {
  return (
    <AtButton
      {...args}
      variant={args.variant}
      kind={args.kind}
      startIcon={args.startIcon ? <TickSquare /> : null}
      endIcon={args.endIcon ? <TickSquare /> : null}
    />
  )
}

// CONTAINED BUTTON
export const ContainedButton = Template.bind({})

ContainedButton.args = {
  name: 'Lorem ipsum',
  variant: AtButtonVariant.Contained,
  kind: AtButtonKind.Default,
  disabled: false,
  startIcon: false,
  endIcon: false,
}

// OUTLINE BUTTON
export const OutlinedButton = Template.bind({})

OutlinedButton.args = {
  name: 'Lorem ipsum',
  variant: AtButtonVariant.Outlined,
  kind: AtButtonKind.Default,
  disabled: false,
  startIcon: false,
  endIcon: false,
}

// TEXT BUTTON
export const TextButton = Template.bind({})

TextButton.args = {
  name: 'Lorem ipsum',
  variant: AtButtonVariant.Text,
  kind: AtButtonKind.Default,
  disabled: false,
  startIcon: false,
  endIcon: false,
}

// ICON BUTTON
const Icon: ComponentStory<typeof AtButton> = (args: any) => {
  return (
    <AtButton
      {...args}
      variant={AtButtonVariant.Contained}
      kind={args.kind}
      startIcon={<TickSquare />}
    />
  )
}

export const IconButton = Icon.bind({})

IconButton.args = {
  kind: AtButtonKind.Default,
  disabled: false,
}
