import { Box } from '@mui/material'
import React from 'react'
import AtLine from '../../../../components/AtLine/AtLine'
import AtTextField from '../../../../components/AtTextField/AtTextField'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { StyledForm } from '../../CreateListing'
import { grey2 } from '../../../../utils/colors'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { getTeamSize } from '../../../../utils/redux/selectors/createListing.selector'

const Step2: React.FunctionComponent = () => {
  const listingForm = useAppSelector((state) => getTeamSize(state))

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
            {Array.from(Array(listingForm.teamSize).keys()).map((i) => (
              <AtTextField
                label={`Role Name ${i + 1}`}
                required={true}
                placeholder={'Enter Role Name'}
                value={''}
              />
            ))}
          </Box>
        </Box>
      </StyledForm>

    </Box>
  )
}

export default Step2
