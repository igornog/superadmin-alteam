import { Box } from '@mui/material'
import React from 'react'
import { grey3 } from '../../utils/colors'
import AtTypography from '../AtTypography/AtTypography'

const AtNoResult: React.FunctionComponent<AtNoResultProps> = (
  props: AtNoResultProps,
) => {
  return (
    <Box
      display={'flex'}
      height={'80%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <AtTypography variant={'h3'} color={grey3}>
        {props.sentence}
      </AtTypography>
    </Box>
  )
}

interface AtNoResultProps {
  sentence: string
}

export default AtNoResult
