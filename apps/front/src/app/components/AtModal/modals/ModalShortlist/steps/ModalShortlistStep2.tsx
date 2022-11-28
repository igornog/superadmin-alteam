import { Box } from '@mui/material'
import { SearchNormal1 } from 'iconsax-react'
import React from 'react'
import { grey2 } from '../../../../../utils/colors'
import AtTextField from '../../../../AtTextField/AtTextField'
import AtTypography from '../../../../AtTypography/AtTypography'

const ModalShortlistStep2: React.FunctionComponent = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <AtTypography color={grey2}>
        Please select listings that are good fit for this talent. Or skip this
        step if the talent is not shortlisted with any client yet.
      </AtTypography>

      <AtTextField
        placeholder="Search in Listings"
        value={''}
        size={'small'}
        startIcon={<SearchNormal1 />}
      />

      <AtTypography color={grey2}>No listings assigned yet.</AtTypography>
    </Box>
  )
}

export default ModalShortlistStep2
