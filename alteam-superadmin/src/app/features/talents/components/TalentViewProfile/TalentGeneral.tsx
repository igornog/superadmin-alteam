import { Box, Grid } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import ModalGeneralInformations from '../../../../components/AtModal/modals/ModalGeneralInformations'
import AtFrame from '../../../../components/AtFrame/AtFrame'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey, grey2 } from '../../../../utils/colors'
import { Talent } from '../../../../utils/redux/types/talents.type'
import AtLine from '../../../../components/AtLine/AtLine'

const TalentGeneral: React.FunctionComponent<TalentGeneralProps> = (
  props: TalentGeneralProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'General information'}
      icon={
        !props.notEditable && (
          <AtTypography>
            <Edit size={16} />
            Edit
          </AtTypography>
        )
      }
      onClick={() => setOpenModal(true)}
    >
      <AtLine spacing={15} />
      <Grid container gap={'15px'}>
        <Box display={'flex'} width={'100%'}>
          <Grid item xs={3}>
            <AtTypography color={grey2}>Role:</AtTypography>
          </Grid>
          <Grid item xs={9}>
            <AtTypography color={grey}>{props.talent.role}</AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item xs={3}>
            <AtTypography color={grey2}>Availability:</AtTypography>
          </Grid>
          <Grid item xs={9}>
            <AtTypography color={grey}>
              {props.talent.availability ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item xs={3}>
            <AtTypography color={grey2}>Salary Expectations:</AtTypography>
          </Grid>
          <Grid item xs={9}>
            <AtTypography color={grey}>
              {props.talent.salaryExpectation ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item xs={3}>
            <AtTypography color={grey2}>Work Experience:</AtTypography>
          </Grid>
          <Grid item xs={9}>
            <AtTypography color={grey}>
              {props.talent.experience ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item xs={3}>
            <AtTypography color={grey2}>Portfolio Link:</AtTypography>
          </Grid>
          <Grid item xs={9}>
            <AtTypography color={grey}>
              {props.talent.portfolio ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item xs={3}>
            <AtTypography color={grey2}>Email:</AtTypography>
          </Grid>
          <Grid item xs={9}>
            <AtTypography color={grey} blurred={props.notEditable}>
              {props.talent.email ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>

        <Box display={'flex'} width={'100%'}>
          <Grid item xs={3}>
            <AtTypography color={grey2}>Phone Number:</AtTypography>
          </Grid>
          <Grid item xs={9}>
            <AtTypography color={grey} blurred={props.notEditable}>
              {props.talent.phoneNumber ?? 'N/A'}
            </AtTypography>
          </Grid>
        </Box>
      </Grid>

      <ModalGeneralInformations
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </AtFrame>
  )
}

interface TalentGeneralProps {
  talent: Talent
  notEditable?: boolean
}

export default TalentGeneral
