import React, { useEffect, useRef, useState } from 'react'
import timezone from 'countries-and-timezones'
import { Box, ClickAwayListener } from '@mui/material'
import Collapse from '@mui/material/Collapse'

import styled from 'styled-components'
import { black, grey2, grey4, grey5, white } from '../../utils/colors'
import { boxShadow } from '../../utils/theme'
import AtTextField, { AtTextFieldProps } from '../AtTextField/AtTextField'
import AtTypography from '../AtTypography/AtTypography'

const StyledContentPopover = styled(Collapse)<{
  $minWidth?: number
  left?: number
  top?: number
}>`
  position: absolute;
  padding: 10px;
  padding-bottom: 0;
  max-height: 400px !important;
  overflow: scroll;
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

const StyledDropdownElement = styled.div<{ color: string }>`
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

const StyledTextField = styled(AtTextField)`
  justify-content: space-between;
  & input {
    color: ${grey4} !important;
  }
`

const AtTimezoneDropdown: React.FunctionComponent<AtTimeZoneDropdownProps> = (
  props: AtTimeZoneDropdownProps,
) => {
  const dropdownRef = useRef<any>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [selectedItem, setSelectedItem] = useState<string>()
  const [search, setSearch] = useState('')

  const timezones: any = Object.values(timezone.getAllTimezones())

  const possibilities = ['Europe', 'America', 'Asia', 'Australia', 'Pacific']

  const groupedTimeZones = possibilities.reduce(
    (acc: any, possibility: any) => {
      const filteredTimezones = timezones.filter((timeZone: any) =>
        timeZone.name.includes(possibility),
      )
      const groupedByUTC = filteredTimezones
        .reduce((acc: any, timeZone: any) => {
          const existingGroup = acc.find(
            (group: any) => group.utcOffset === timeZone.utcOffset,
          )
          if (existingGroup) {
            existingGroup.countries.push(timeZone.name.split('/')[1])
          } else {
            acc.push({
              name: timeZone.utcOffsetStr,
              utcOffset: timeZone.utcOffset,
              countries: [timeZone.name.split('/')[1]],
            })
          }
          return acc
        }, [])
        .sort((a: any, b: any) => a.utcOffset - b.utcOffset)
      acc.push({
        name: possibility,
        timezones: groupedByUTC.map((group: any) => {
          group.countries = [...new Set(group.countries)]
          return group
        }),
      })
      return acc
    },
    [],
  )

  const filteredGroupedTimeZones = groupedTimeZones
    .map((group: any) => {
      group.timezones = group.timezones.filter(
        (timezone: any) =>
          timezone.name.toLowerCase().includes(search.toLowerCase()) ||
          timezone.countries.some((country: any) =>
            country.toLowerCase().includes(search.toLowerCase()),
          ),
      )
      return group
    })
    .filter((group: any) => group.timezones.length > 0)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = () => {
    setAnchorEl(dropdownRef.current)
  }

  const handleSelect = (item: string) => {
    setSelectedItem(item)
    props.handleSelect?.(item)
  }

  const open = Boolean(anchorEl)

  useEffect(() => {
    if (selectedItem) {
      setSearch(`UTC ${selectedItem}`)
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
          placeholder={props.placeholder}
          value={search}
          dropdown={true}
          open={open}
          onClick={open ? handleClose : handleClick}
          onValueChange={(e) => setSearch(e)}
        />

        <StyledContentPopover
          in={open}
          $minWidth={dropdownRef?.current?.offsetWidth}
        >
          {filteredGroupedTimeZones.map((zone: any, id: number) => {
            return (
              <Box display={'flex'} flexDirection={'column'} key={id}>
                <AtTypography variant={'caption'} $bold={true}>
                  {zone.name}
                </AtTypography>
                {zone.timezones.map((utc: any, id: number) => {
                  return (
                    <StyledDropdownElement
                      key={id}
                      onClick={() => handleSelect(utc.name)}
                      color={utc.name === selectedItem ? black : grey2}
                    >
                      <AtTypography ellipsis={1}>
                        (UTC {utc.name}) {utc.countries.join(', ')}
                      </AtTypography>
                    </StyledDropdownElement>
                  )
                })}
              </Box>
            )
          })}
        </StyledContentPopover>
      </Box>
    </ClickAwayListener>
  )
}

interface AtTimeZoneDropdownProps extends AtTextFieldProps {
  handleSelect?: (item: string) => void
}

export default AtTimezoneDropdown
