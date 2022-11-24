import { Box, ClickAwayListener } from '@mui/material'
import Collapse from '@mui/material/Collapse'

import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { black, grey2, grey4, grey5, white } from '../../utils/colors'
import { boxShadow } from '../../utils/theme'
import AtTextField, { AtTextFieldProps } from '../AtTextField/AtTextField'
import AtTypography from '../AtTypography/AtTypography'

export const StyledContentPopover = styled(Collapse)<{
  $minWidth?: number
  left?: number
  top?: number
}>`
  position: absolute;
  min-width: ${({ $minWidth }) => $minWidth && $minWidth + 'px'};
  background-color: ${white};
  box-shadow: ${boxShadow};
  border: 1px solid ${grey5};
  border-radius: 5px;
  margin-top: 5px;
  z-index: 999;
  left: ${({ left }) => left && left + 'px'};
  top: ${({ top }) => top && top + 'px'};
`

export const StyledDropdownElement = styled.div<{ color: string }>`
  padding: 10px;
  transition: 0.25s;
  display: flex;
  color: ${({ color }) => color};
  &:hover {
    cursor: pointer;
    transition: 0.5s;
    & p {
      color: ${black};
    }
  }
`

const StyledTextField = styled(AtTextField)`
  justify-content: space-between;
  & input {
    color: ${grey4} !important;
  }
`

const AtTextFieldDropdown: React.FunctionComponent<AtTextFieldDropdownProps> = (
  props: AtTextFieldDropdownProps,
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
      <Box
        ref={dropdownRef}
        width={props.fullWidth ? '100%' : 'fit-content'}
        position={'relative'}
      >
        <StyledTextField
          {...props}
          dropdown={true}
          open={open}
          onClick={open ? handleClose : handleClick}
          placeholder={selectedItem ? selectedItem.label : props.placeholder}
        />
        <StyledContentPopover
          in={open}
          $minWidth={dropdownRef?.current?.offsetWidth}
        >
          {props.listItems.map((item: DropdownItem) => (
            <StyledDropdownElement
              key={item.id}
              onClick={() => handleSelect(item)}
              color={item.id === selectedItem?.id ? black : grey2}
            >
              <AtTypography>{item.label}</AtTypography>
            </StyledDropdownElement>
          ))}
        </StyledContentPopover>
      </Box>
    </ClickAwayListener>
  )
}

export interface DropdownItem {
  id: number | string
  label: string
}

interface AtTextFieldDropdownProps extends AtTextFieldProps {
  listItems: DropdownItem[]
  handleSelect?: (item: DropdownItem) => void
}

export default AtTextFieldDropdown
