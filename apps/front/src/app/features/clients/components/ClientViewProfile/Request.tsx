import { Box, Grid } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import ModalRequest from '../../../../components/AtModal/modals/ModalRequest'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey, grey2 } from '../../../../utils/colors'
import { Client } from '../../../../utils/redux/types/clients.type'

const Request: React.FunctionComponent<RequestProps> = (
  props: RequestProps,
) => {
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
            <AtTypography color={grey}>
              {props.client.projectType || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Delivery Type: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.deliveryType || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Team Request: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.teamRequest || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Description: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.request || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>
      </Box>

      <ModalRequest open={openModal} onClose={() => setOpenModal(false)} />
    </AtFrame>
  )
}

interface RequestProps {
  client: Client
}

export default Request
