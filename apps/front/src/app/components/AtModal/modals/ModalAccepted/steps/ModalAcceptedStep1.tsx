import { Box } from '@mui/material'
import React from 'react'
import { grey2 } from '../../../../../utils/colors'
import AtGroup from '../../../../AtGroup/AtGroup'
import AtTypography from '../../../../AtTypography/AtTypography'

const ModalAcceptedStep1: React.FunctionComponent = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <AtTypography color={grey2}>
        Please select folders you want this user to be moved to. You can select
        multiple folders/clients, and select folders inside.
      </AtTypography>

      <AtGroup />
    </Box>
  )
}

export default ModalAcceptedStep1
