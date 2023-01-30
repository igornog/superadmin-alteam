import { Box } from '@mui/material'
import React from 'react'
import { grey2 } from '../../../../../../utils/colors'
import AtDropBox from '../../../../../AtDropBox/AtDropBox'
import AtTag from '../../../../../AtTag/AtTag'
import AtTypography from '../../../../../AtTypography/AtTypography'

const ModalCreateTalentStep3: React.FunctionComponent = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
      <AtTypography color={grey2}>
        Please attach any documents that are related to this talent. Fields with
        * are mandatory to fill.
      </AtTypography>

      <AtDropBox />

      <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
      </Box>
    </Box>
  )
}

export default ModalCreateTalentStep3
