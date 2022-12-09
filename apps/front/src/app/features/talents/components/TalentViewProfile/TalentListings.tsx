import { Box } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import ModalListings from '../../../../components/AtModal/modals/ModalListings'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey, grey2 } from '../../../../utils/colors'

const TalentListings: React.FunctionComponent = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Listed with'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <AtTypography color={grey2}>Chaptr:</AtTypography>
          <AtTypography color={grey}>
            Back-End Developer 6 Month Contract
          </AtTypography>
          <AtTypography color={grey}>Shortlisted</AtTypography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <AtTypography color={grey2}>Chaptr:</AtTypography>
          <AtTypography color={grey}>
            Front-End Developer 6 Month Contract
          </AtTypography>
          <AtTypography color={grey}>Accepted</AtTypography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <AtTypography color={grey2}>Glide:</AtTypography>
          <AtTypography color={grey}>
            Back-End Developer 1 Month Trial
          </AtTypography>
          <AtTypography color={grey}>Shortlisted</AtTypography>
        </Box>
      </Box>
      <ModalListings isOpen={openModal} onClose={() => setOpenModal(false)} />
    </AtFrame>
  )
}

export default TalentListings
