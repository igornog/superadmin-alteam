import { Box } from '@mui/material'
import React from 'react'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { grey2 } from '../../../../../../utils/colors'

const Step2: React.FunctionComponent = () => {
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
            <AtTextField
              label={'Role Name 1'}
              required={true}
              placeholder={'Enter Role Name'}
              value={''}
            />

            <AtTextField
              label={'Role Name 2'}
              required={true}
              placeholder={'Enter Role Name'}
              value={''}
            />

            <AtTextField
              label={'Role Name 3'}
              required={true}
              placeholder={'Enter Role Name'}
              value={''}
            />

            <AtTextField
              label={'Role Name 4'}
              required={true}
              placeholder={'Enter Role Name'}
              value={''}
            />

            <AtTextField
              label={'Role Name 5'}
              required={true}
              placeholder={'Enter Role Name'}
              value={''}
            />

            <AtTextField
              label={'Role Name 6'}
              required={true}
              placeholder={'Enter Role Name'}
              value={''}
            />
          </Box>
        </Box>
      </StyledForm>

    </Box>
  )
}

export default Step2
