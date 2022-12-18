import { Box, ClickAwayListener } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { ArrowDown2 } from 'iconsax-react'

import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { black, grey2, grey5, white } from '../../utils/colors'
import { getText } from '../../utils/helpers'
import { boxShadow } from '../../utils/theme'
import AtButton, { AtButtonProps } from '../AtButton/AtButton'
import AtTypography from '../AtTypography/AtTypography'

export const StyledContentPopover = styled(Collapse)<{
  $minWidth?: number
  left?: number
  top?: number
  align?: string
}>`
  position: absolute;
  min-width: ${({ $minWidth }) => $minWidth && $minWidth + 'px'};
  background-color: ${white};
  box-shadow: ${boxShadow};
  border: 1px solid ${grey5};
  border-radius: 5px;
  z-index: 1300;
  padding: 10px;
  margin-top: 10px;
  box-sizing: border-box;

  ${({ align }) =>
    align === 'bottom-left' &&
    css`
      top: 35px;
      left: 0;
    `}

  ${({ align }) =>
    align === 'bottom-right' &&
    css`
      top: 35px;
      right: 0;
    `}

  ${({ align }) =>
    align === 'top-right' &&
    css`
      top: -100px;
      right: 0;
    `}

  ${({ align }) =>
    align === 'top-left' &&
    css`
      top: -100px;
      left: 0;
    `}
`

export const StyledDropdownElement = styled.div<{ color: string }>`
  transition: 0.25s;
  display: flex;
  color: ${({ color }) => color};

  &:hover {
    cursor: pointer;
    transition: 0.5s;

    & p,
    & svg {
      color: ${black};
    }
  }
`

const StyledLabel = styled.div`
  position: absolute;
  top: -9px;
  left: 20px;
  z-index: 1;

  background-color: ${grey2};
  font-family: Inter;
  font-size: 10px;
  padding: 3px 5px;
  border-radius: 5px;
  color: ${white};
  display: flex;
  align-items: center;
`

const AtDropdown: React.FunctionComponent<AtDropdownProps> = (
  props: AtDropdownProps,
) => {
  const dropdownRef = useRef<any>(null)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [selectedItem, setSelectedItem] = useState<DropdownItem>()

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = () => {
    if (!props.disabled) {
      setAnchorEl(dropdownRef.current)
    }
  }

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item)
    props.handleSelect?.(item)
  }

  const open = Boolean(anchorEl)

  useEffect(() => {
    if (selectedItem) {
      handleClose()
    }
  }, [selectedItem])

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box ref={dropdownRef} position={'relative'}>
        {props.label && <StyledLabel>{props.label}</StyledLabel>}
        <AtButton
          {...props}
          kind={props.kind}
          variant={props.variant}
          onClick={open ? handleClose : handleClick}
          name={selectedItem ? getText(selectedItem.label) : props.placeholder}
          endIcon={<ArrowDown2 size={10} />}
          fontSize={props.fontSize}
          iconsize={10}
          padding={props.padding}
          flexibleHeight={props.flexibleHeight}
        />

        <StyledContentPopover
          in={open}
          $minWidth={dropdownRef?.current?.offsetWidth}
          align={props.align ?? 'bottom-left'}
        >
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            {props.listItems.map((item: DropdownItem) => (
              <StyledDropdownElement
                key={item.id}
                onClick={() => handleSelect(item)}
                color={item.id === selectedItem?.id ? black : grey2}
              >
                <AtTypography fontSize={props.fontSize}>
                  {item.label}
                </AtTypography>
              </StyledDropdownElement>
            ))}
          </Box>
        </StyledContentPopover>
      </Box>
    </ClickAwayListener>
  )
}

interface DropdownItem {
  id: number | string
  value: string
  label: React.ReactNode
}

interface AtDropdownProps extends AtButtonProps {
  listItems: DropdownItem[]
  placeholder?: string
  label?: string
  handleSelect?: (item: DropdownItem) => void
  align?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export default AtDropdown
