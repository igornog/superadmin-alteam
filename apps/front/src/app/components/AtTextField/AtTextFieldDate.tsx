import React, { useRef } from 'react'
import AtTextField, { AtTextFieldProps, AtTextFieldType } from './AtTextField'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { Box } from '@mui/material'
import { black, green } from '../../utils/colors'
import moment from 'moment'

const AtTextFieldDate: React.FunctionComponent<AtTextFieldProps> = (
  props: AtTextFieldProps,
) => {
  const [value, setValue] = React.useState<any>(null)
  const dropdownRef = useRef<any>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setIsOpen((isOpen) => !isOpen)
    setAnchorEl(event.currentTarget)
  }

  return (
    <Box ref={dropdownRef}>
      <DesktopDatePicker
        value={value}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PopperProps={{
          placement: 'bottom-end',
          anchorEl: anchorEl,
          sx: {
            '& .MuiPickersDay-root': {
              '&.Mui-selected': {
                backgroundColor: green,

                '&:hover': {
                  backgroundColor: black,
                },

                '&:focus': {
                  backgroundColor: green,
                },
              },
            },
          },
        }}
        renderInput={(params: any) => {
          return (
            <AtTextField
              {...params.inputProps}
              {...props}
              type={AtTextFieldType.Number}
              label={props.label}
              endIcon={
                <span onClick={handleClick}>
                  {params.InputProps?.endAdornment}
                </span>
              }
              inputProps={params.inputProps}
            />
          )
        }}
        onChange={(newValue) => {
          const formatedDate = moment(newValue).utc()

          props?.onValueChange?.(formatedDate)
          setValue(newValue)
        }}
      />
    </Box>
  )
}

export default AtTextFieldDate
