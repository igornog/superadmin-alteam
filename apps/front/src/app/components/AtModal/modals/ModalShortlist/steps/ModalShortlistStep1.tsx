import { Box } from '@mui/material'
import React from 'react'
import { grey2 } from '../../../../../utils/colors'
import AtTree from '../../../../AtTree/AtTree'
import AtTypography from '../../../../AtTypography/AtTypography'

const ModalShortlistStep1: React.FunctionComponent = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <AtTypography color={grey2}>
        Please select folders you want this user to be moved to. You can select
        multiple folders/clients, and select folders inside.{' '}
      </AtTypography>

      <AtTree />
    </Box>
  )
}

export default ModalShortlistStep1
