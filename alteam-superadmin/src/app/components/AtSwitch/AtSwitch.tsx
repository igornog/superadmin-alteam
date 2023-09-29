import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { blue, green, red, white } from '../../utils/colors'
import { convertHexToRGBA } from '../../utils/helpers'

const IOSSwitch = styled(Switch).attrs(() => ({
  classes: {
    root: 'root',
    switchBase: 'switchBase',
    thumb: 'thumb',
    track: 'track',
    checked: 'checked',
    focusVisible: 'focusVisible',
  },
  disableRipple: true,
  focusVisibleClassName: 'focusVisible',
}))<{ $forceColors?: boolean }>`
  &.root {
    width: 65px;
    height: 27px;
    padding: 0;
    margin: 8px;
  }

  .switchBase {
    padding: 1.5px 1px;

    &.checked {
      transform: translateX(38px);
      color: white;

      & + .track {
        background-color: ${({ $forceColors }) =>
          $forceColors ? red : convertHexToRGBA(blue, 0.1)};
        opacity: 1;
        border: none;
      }
    }

    &.focusVisible &.thumb {
      color: ${convertHexToRGBA(blue, 0.1)};
      border: 6x sold #fff;
    }
  }

  .thumb {
    width: 24px;
    height: 24px;
    background-color: ${({ $forceColors }) => ($forceColors ? white : green)};
    box-shadow: none;
  }

  & .track {
    border-radius: 13px;
    opacity: 1;
    background-color: ${({ $forceColors }) =>
      $forceColors ? green : convertHexToRGBA(blue, 0.1)};
  }
`

const AtSwitch: React.FunctionComponent<AtSwitchProps> = (
  props: AtSwitchProps,
) => {
  return (
    <FormControlLabel
      control={
        <IOSSwitch
          sx={{ m: 1 }}
          defaultChecked={props.defaultChecked}
          onChange={props.onChange}
          $forceColors={props.forceColors || false}
        />
      }
      style={{
        fontSize: '12px',
      }}
      label={props.label}
      labelPlacement={props.placement ?? 'start'}
    />
  )
}

interface AtSwitchProps {
  label: string | React.ReactNode
  onChange: () => void
  placement?: 'end' | 'start' | 'top' | 'bottom'
  defaultChecked?: boolean
  forceColors?: boolean
}

export default AtSwitch
