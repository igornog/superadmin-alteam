import React from 'react'
import { AtTextFieldProps } from './AtTextField'
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'

const AtTextFieldDate: React.FunctionComponent<AtTextFieldProps> = (
  props: AtTextFieldProps,
) => {
  const [value, setValue] = React.useState<any>(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue: string) => {
          setValue(newValue)
        }}
        renderInput={(params: any) => <AtTextField {...props} />}
      /> */}

      <DesktopDatePicker
        label={'Start'}
        inputFormat="DD/MM/YYYY"
        renderInput={(params: any) => (
          <TextField {...params} variant="standard" />
        )}
      />
    </LocalizationProvider>
  )
}

export default AtTextFieldDate
