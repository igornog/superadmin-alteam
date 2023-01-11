import { Box } from '@mui/material'
import React, { useState } from 'react'
import { grey2 } from '../../../../../../utils/colors'
import AtTextFieldDropdown from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { useAppSelector } from '../../../../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../../../../utils/redux/selectors/clients.selector'

const ProjectStep1: React.FunctionComponent = () => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const [client, setClient] = useState(selectedClient.companyName)

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
            label={'Project Name'}
            required={true}
            placeholder={'Enter Project Name'}
            value={''}
            maxLength={30}
          />

          <AtTextField
            label={'Client'}
            readonly={true}
            defaultValue={selectedClient.companyName}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            placeholder={'Select Number of Individuals'}
            $listItems={[
              {
                id: 0,
                label: '1 - 10',
              },
              {
                id: 1,
                label: 'More than 10',
              },
            ]}
            label={'Number of Individuals'}
          />

          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            <AtTextFieldDropdown
              fullWidth={true}
              required={true}
              placeholder={'Select Work Type'}
              $listItems={[
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

            <AtTextFieldDropdown
              fullWidth={true}
              required={true}
              placeholder={'Enter Timezone'}
              $listItems={Array.from(Array(25).keys()).map((key) => ({
                id: key,
                label: `GMT${
                  key > 0 ? (key <= 12 ? '-' + key : '+' + (key - 12)) : ''
                }`,
              }))}
            />
          </Box>
          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            placeholder={'Select Avaliability'}
            $listItems={[
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
            maxLength={30}
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
              placeholder={'Select Rate'}
              $listItems={[
                {
                  id: 0,
                  label: 'Fixed',
                },
                {
                  id: 1,
                  label: 'Daily',
                },
              ]}
              label={'Rate'}
            />

            <AtTextField
              placeholder={'Enter Exact Rate'}
              maxLength={30}
              value={''}
            />
          </Box>

          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            placeholder={'Select Difficulty'}
            $listItems={[
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

export default ProjectStep1
