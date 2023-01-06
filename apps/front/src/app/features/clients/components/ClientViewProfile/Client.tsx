import { Box, Grid } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import ModalClient from '../../../../components/AtModal/modals/ModalClient'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey, grey2 } from '../../../../utils/colors'
import { Client as ClientType } from '../../../../utils/redux/types/clients.type'

const Client: React.FunctionComponent<ClientProps> = (props: ClientProps) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Client'}
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
            <AtTypography color={grey2}>Email: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.email || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Full Name: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.fullName || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Position: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.position || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>
      </Box>

      <ModalClient open={openModal} onClose={() => setOpenModal(false)} />
    </AtFrame>
  )
}

interface ClientProps {
  client: ClientType
}

export default Client
