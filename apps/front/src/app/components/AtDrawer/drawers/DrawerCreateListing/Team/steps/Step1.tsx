import { Box } from '@mui/material'
import React, { useState } from 'react'
import { grey2 } from '../../../../../../utils/colors'
import AtTextFieldDropdown, { DropdownItem } from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { useAppDispatch, useAppSelector } from '../../../../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../../../../utils/redux/selectors/clients.selector'
import { selectTeamSize } from '../../../../../../utils/redux/actions/listing.action'

const Step1: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()

  const [teamSize, setTeamSize] = useState<DropdownItem>()
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  const handleSelectTeamSize = (e: DropdownItem) => {
    setTeamSize(e)
    dispatch(selectTeamSize(parseInt(e.label)))
  }

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
            value={selectedClient.name}
            placeholder={selectedClient.name}
            listItems={[]}
            label={'Client'}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            required={true}
            value={teamSize?.label}
            handleSelect={(e) => handleSelectTeamSize(e)}
            placeholder={'Select Team Size (max 10)'}
            listItems={Array.from(Array(10).keys()).map((key) => ({ id: key + 1, label: (key + 1).toString() }))}
            label={'Team Size (max 10)'}
          />

          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            <AtTextFieldDropdown
              fullWidth={true}
              required={true}
              value={selectedClient.name}
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

export default Step1
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}

