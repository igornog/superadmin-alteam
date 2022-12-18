import { Box } from '@mui/material'
import React from 'react'
import { StyledForm } from '../../CreateListing'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey2 } from '../../../../utils/colors'
import AtLine from '../../../../components/AtLine/AtLine'
import AtTextField from '../../../../components/AtTextField/AtTextField'


const ProjectStep4: React.FunctionComponent = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
          <AtTypography variant={'h4'}>Screening Questions</AtTypography>
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
            <AtTextField
              label={'Screening Question 1'}
              placeholder={'Enter Screening Question'}
              value={''}
            />

            <AtTextField
              label={'Screening Question 2'}
              placeholder={'Enter Screening Question'}
              value={''}
            />

            <AtTextField
              label={'Screening Question 3'}
              placeholder={'Enter Screening Question'}
              value={''}
            />
          </Box>
        </Box>
      </StyledForm>

    </Box>
  )
}

export default ProjectStep4
