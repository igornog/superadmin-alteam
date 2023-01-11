import { Box, Grid } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import ModalCompany from '../../../../components/AtModal/modals/ModalCompany'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey, grey2 } from '../../../../utils/colors'
import { Client } from '../../../../utils/redux/types/clients.type'

const Company: React.FunctionComponent<CompanyProps> = (
  props: CompanyProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Company'}
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
            <AtTypography color={grey2}>Phone: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.phoneNumber || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Company URL: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.companyUrl || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Industry: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.industry || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>

        <Grid container={true}>
          <Grid item={true} xs={4}>
            <AtTypography color={grey2}>Linkedin URL: </AtTypography>
          </Grid>
          <Grid item={true} xs={8}>
            <AtTypography color={grey}>
              {props.client.linkedinUrl || 'N/A'}
            </AtTypography>
          </Grid>
        </Grid>
      </Box>

      <ModalCompany open={openModal} onClose={() => setOpenModal(false)} />
    </AtFrame>
  )
}

interface CompanyProps {
  client: Client
}

export default Company
