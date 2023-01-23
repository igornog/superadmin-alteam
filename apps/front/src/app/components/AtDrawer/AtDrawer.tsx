import { Drawer } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { black, grey4, grey5, white } from '../../utils/colors'
import { convertHexToRGBA } from '../../utils/helpers'
import { boxShadow } from '../../utils/theme'

export const StyledStepper = styled.div`
  position: sticky;
  bottom: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: fit-content;
  align-self: center;
`

export const StyledFormStepper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: ${white};
  border: 1px solid ${grey5};
  padding: 10px;
  box-shadow: ${boxShadow};
  gap: 10px;
`

export const StyledDot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? black : grey4)};
`

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
