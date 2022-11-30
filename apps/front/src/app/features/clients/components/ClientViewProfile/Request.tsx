import { Box, Grid } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import ModalRequest from '../../../../components/AtModal/modals/ModalRequest'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey, grey2 } from '../../../../utils/colors'

const Request: React.FunctionComponent = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Request'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Project Type: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>App Development</AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Delivery Type: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>One-off project</AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Team Request: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>Solo freelancer</AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Description: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
              adipiscing placerat venenatis odio vel dignissim nec diam.
            </AtTypography>
          </Grid>
        </Grid>
      </Box>

      <ModalRequest open={openModal} onClose={() => setOpenModal(false)} />
    </AtFrame>
  )
}

export default Request
