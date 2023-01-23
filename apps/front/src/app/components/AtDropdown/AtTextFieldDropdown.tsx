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
  z-index: 9999;
  left: ${({ left }) => left && left + 'px'};
  top: ${({ top }) => top && top + 'px'};
`

export const StyledDropdownElement = styled.div<{ color: string }>`
  padding: 10px;
  display: flex;
  transition: 0.25s;
  color: ${({ color }) => color};
  &:hover {
    cursor: pointer;
    transition: 0.5s;
    & p {
      color: ${black};
    }
  }
`

const StyledTextField = styled(AtTextField)<{ placeholder: any }>`
  justify-content: space-between;

  & input {
    color: ${({ placeholder }) => (placeholder ? black : grey4)};
  }
`

const AtTextFieldDropdown: React.FunctionComponent<AtTextFieldDropdownProps> = (
  props: AtTextFieldDropdownProps,
) => {
  const dropdownRef = useRef<any>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [selectedItem, setSelectedItem] = useState<DropdownItem>()
  const [valueSearchable, setValueSearchable] = useState('')

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

  useEffect(() => {
    setValueSearchable(props.value || '')

    if (!props.value) {
      setSelectedItem(undefined)
    }
  }, [props.value])

  const filterSearch = () => {
    return valueSearchable && props.searchable
      ? props.$listItems.filter((item: DropdownItem) =>
          item.label.toLowerCase().includes(valueSearchable.toLowerCase()),
        )
      : props.$listItems
  }

  useEffect(() => {
    if (!open) {
      if (selectedItem) {
        setSelectedItem(selectedItem)
        setValueSearchable(selectedItem.label)
      }
    } else {
      setValueSearchable('')
    }
  }, [open, selectedItem])

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
          onValueChange={(e) => setValueSearchable(e)}
          onClick={open ? handleClose : handleClick}
          placeholder={props.placeholder}
          value={valueSearchable}
        />

        <StyledContentPopover
          in={open}
          $minWidth={dropdownRef?.current?.offsetWidth}
        >
          {filterSearch().map((item: DropdownItem) => (
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
  key?: string
  label: string
  value?: string
}

interface AtTextFieldDropdownProps extends AtTextFieldProps {
  searchable?: boolean
  $listItems: DropdownItem[]
  handleSelect?: (item: DropdownItem) => void
}

export default AtTextFieldDropdown
