import { Box } from '@mui/material'
import React from 'react'
import AtTextFieldDropdown from '../../../../AtDropdown/AtTextFieldDropdown'
import AtLine from '../../../../AtLine/AtLine'
import AtTextField from '../../../../AtTextField/AtTextField'
import AtTypography from '../../../../AtTypography/AtTypography'
import { StyledForm } from '../DrawerCreateClient'

const Step2: React.FunctionComponent = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box padding={'20px'}>
          <AtTypography variant={'h4'}>Request</AtTypography>
        </Box>
        <AtLine />

        <Box
          padding={'20px'}
          display={'flex'}
          flexDirection={'column'}
          gap={'50px'}
        >
          <AtTextFieldDropdown
            fullWidth={true}
            value={''}
            placeholder={'App development'}
            listItems={[
              {
                id: 0,
                label: 'Full Time',
              },
              {
                id: 1,
                label: 'Part Time',
              },
            ]}
            label={'Project Type'}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            value={''}
            placeholder={'One-off project'}
            listItems={[
              {
                id: 0,
                label: 'Full Time',
              },
              {
                id: 1,
                label: 'Part Time',
              },
            ]}
            label={'Delivery Type'}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            value={''}
            placeholder={'Solo freelancer'}
            listItems={[
              {
                id: 0,
                label: 'Full Time',
              },
              {
                id: 1,
                label: 'Part Time',
              },
            ]}
            label={'Team Request'}
          />

          <AtTextField
            multiline={true}
            rows={6}
            label={'Request'}
            value={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque adipiscing placerat venenatis odio vel dignissim nec diam.'
            }
          />
        </Box>
      </StyledForm>

      <StyledForm>
        <Box padding={'20px'}>
          <AtTypography variant={'h4'}>Client</AtTypography>
        </Box>

        <AtLine />

        <Box
          padding={'20px'}
          paddingTop={'30px'}
          display={'flex'}
          flexDirection={'column'}
          gap={'30px'}
        >
          <AtTextField label={'Email'} placeholder={'Enter Email'} value={''} />

          <AtTextField
            label={'Full Name'}
            placeholder={'Enter Full Name'}
            value={''}
          />

          <AtTextField
            label={'Position'}
            placeholder={'Enter position'}
            value={''}
          />
        </Box>
      </StyledForm>
    </Box>
  )
}

export default Step2
