import { Box } from '@mui/material'
import React from 'react'
import { grey2 } from '../../../../../../utils/colors'
import AtTextFieldDropdown from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'

const Step1: React.FunctionComponent<Step1Props> = (props: Step1Props) => {  
  return (
    <StyledForm>
      <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
        <AtTypography variant={'h4'}>General Information</AtTypography>
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
            label={'Team Project Name'}
            required={true}
            placeholder={'Enter Team Project Name'}
            value={''}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            value={props.selectedClientName}
            placeholder={props.selectedClientName}
            listItems={[]}
            label={'Client'}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            value={''}
            placeholder={'Select Team Size (max 10)'}
            listItems={[
              { id: 0, label: '1' },
              { id: 1, label: '2' },
              { id: 2, label: '3' },
              { id: 3, label: '4' },
              { id: 4, label: '5' },
              { id: 5, label: '6' },
              { id: 6, label: '7' },
              { id: 7, label: '8' },
              { id: 8, label: '9' },
              { id: 9, label: '10' },
            ]}
            label={'Team Size (max 10)'}
          />

          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            <AtTextFieldDropdown
              fullWidth={true}
              required={true}
              value={props.selectedClientName}
              placeholder={'Select Work Type'}
              listItems={[
                {
                  id: 0,
                  label: 'Remote',
                },
                {
                  id: 1,
                  label: 'Hybrid',
                },
              ]}
              label={'Work Type'}
            />
            <AtTextField
              placeholder={'Enter Timezone'}
              value={''}
            />
          </Box>
          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            value={''}
            placeholder={'Select Avaliability'}
            listItems={[
              {
                id: 0,
                label: 'Part-Time',
              },
              {
                id: 1,
                label: 'Full-Time',
              },
            ]}
            label={'Avaliability'}
          />

          <AtTextField
            label={'Project Length'}
            required={true}
            placeholder={'Enter Project Length'}
            value={''}
          />

          <AtTextField
            label={'Start Date'}
            required={true}
            placeholder={'Enter Start Date'}
            value={''}
          />

          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            <AtTextFieldDropdown
              fullWidth={true}
              required={true}
              value={''}
              placeholder={'Select Rate Type'}
              listItems={[
                {
                  id: 0,
                  label: 'Fixed',
                },
                {
                  id: 1,
                  label: 'Daily',
                },
              ]}
              label={'Rate Type'}
            />
            <AtTextField
              placeholder={'Enter Exact Rate'}
              value={''}
            />
          </Box>

          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            value={''}
            placeholder={'Select Difficulty'}
            listItems={[
              {
                id: 0,
                label: 'Easy/Junior',
              },
              {
                id: 1,
                label: 'Hard/Senior',
              },
            ]}
            label={'Difficulty'}
          />

          <AtTextField
            label={'Learning'}
            required={true}
            placeholder={'Enter Learning Link'}
            value={''}
          />

        </Box>
      </Box>
    </StyledForm>
  )
}

interface Step1Props {
  selectedClientName: string
}


export default Step1
