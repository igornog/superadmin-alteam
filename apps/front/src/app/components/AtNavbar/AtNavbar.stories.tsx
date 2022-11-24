import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta, addDecorator } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import AtNavbar from './AtNavbar'

const Story: ComponentMeta<typeof AtNavbar> = {
  component: AtNavbar,
  title: 'Navbar',
}

addDecorator((story) => (
  <MemoryRouter initialEntries={['/talents']}>{story()}</MemoryRouter>
))

export default Story

const Template: ComponentStory<typeof AtNavbar> = (args: any) => (
  <Box width={'145px'} height={'100%'}>
    <AtNavbar {...args} />
  </Box>
)

export const Primary = Template.bind({})
Primary.args = {}
