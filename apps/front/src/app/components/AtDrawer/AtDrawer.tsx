import { Drawer } from '@mui/material'
import React from 'react'
import { black } from '../../utils/colors'
import { convertHexToRGBA } from '../../utils/helpers'

const AtDrawer: React.FunctionComponent<AtDrawerProps> = (
  props: AtDrawerProps,
) => {
  return (
    <Drawer
      anchor={'right'}
      open={props.open}
      onClose={props.handleClose}
      transitionDuration={{ enter: 600, exit: 300 }}
      hideBackdrop={!props.withBackdrop}
      BackdropProps={{
        style: {
          backgroundColor: convertHexToRGBA(black, 0.5),
        },
      }}
      PaperProps={{
        style: {
          width: props.size,
          boxShadow: 'none',
          backgroundColor: props.backgroundColor,
        },
      }}
    >
      {props.children}
    </Drawer>
  )
}

interface AtDrawerProps {
  open: boolean
  handleClose: () => void
  size: string
  backgroundColor: string
  withBackdrop: boolean
  children: React.ReactNode
}

export default AtDrawer
