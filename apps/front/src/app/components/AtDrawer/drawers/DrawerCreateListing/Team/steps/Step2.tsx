import { Box } from '@mui/material'
import React from 'react'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { grey2 } from '../../../../../../utils/colors'
import { FormFields } from '../../CreateListing'

const TeamStep2: React.FunctionComponent<Step2Props> = (props: Step2Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
          <AtTypography variant={'h4'}>All Roles</AtTypography>
          <AtTypography variant={'caption'} color={grey2}>
            Fields with * are mandatory
          </AtTypography>
        </Box>
        <AtLine />
        <Box
          padding={'20px'}
          display={'flex'}
          flexDirection={'column'}
          gap={'50px'}
        >
          <Box display={'flex'} gap={'30px'} flexDirection={'column'}>
            {props.formData.nbIndividual
              ? Array.from(Array(props.formData.nbIndividual).keys()).map(
                  (i) => (
                    <AtTextField
                      label={`Role Name ${i + 1}`}
                      required={true}
                      placeholder={'Enter Role Name'}
                      value={''}
                    />
                  ),
                )
              : ''}
          </Box>
        </Box>
      </StyledForm>
    </Box>
  )
}

interface Step2Props {
  formData: FormFields
}

export default TeamStep2
