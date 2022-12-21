import { Box } from '@mui/material'
import { grey2 } from '../../../../../../utils/colors'
import AtTextFieldDropdown, { DropdownItem } from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { useAppSelector } from '../../../../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../../../../utils/redux/selectors/clients.selector'
import { FormFields } from '../../CreateListing'
import { RateType } from '../../../../../../utils/redux/types/listings.type'

const TeamStep1: React.FunctionComponent<Step1Props> = (
  props: Step1Props
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  const handleSelectTeamSize = (e: DropdownItem) => {
    const teamSize = parseInt(e.label)
    props.setFormData({
      ...props.formData,
      nbIndividual: teamSize,
    })
  }

  const handleSelectRateType = (e: DropdownItem) => {
    props.setFormData({
      ...props.formData,
      rateType: e.label,
    })
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
            maxLength={30}

          />

          <AtTextField
            label={'Client'}
            readonly={true}
            defaultValue={selectedClient.companyName}
          />

          <AtTextFieldDropdown
            fullWidth={true}
            placeholder={'Select Team Size (max 10)'}
            required={true}
            handleSelect={(e) => handleSelectTeamSize(e)}
            $listItems={Array.from(Array(10).keys()).map((key) => ({ id: key + 1, label: (key + 1).toString() }))}
            label={'Team Size (max 10)'}
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
              $listItems={Array.from(Array(25).keys()).map((key) => (
                {
                  id: key,
                  label: `GMT${(key > 0 ? key <= 12 ? '-' + key : '+' + (key - 12) : '')}`
                }
              ))}
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

          />

          <AtTextField
            label={'Start Date'}
            required={true}
            placeholder={'Enter Start Date'}

          />

          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            <AtTextFieldDropdown
              fullWidth={true}
              required={true}
              value={props.formData.rateType}
              handleSelect={(e) => handleSelectRateType(e)}
              placeholder={'Select Rate Type'}
              $listItems={[
                {
                  id: 0,
                  label: 'Fixed',
                },
                {
                  id: 1,
                  label: 'Daily',
                },
                {
                  id: 2,
                  label: 'Hourly',
                },
              ]}
              label={'Rate Type'}
            />

            {props.formData.rateType === RateType.Fixed ?
              <AtTextField
                placeholder={'Enter Exact Rate'}
                maxLength={30}

              />
              : props.formData.rateType ?
                <>
                  <AtTextField
                    placeholder={`Enter ${props.formData.rateType} Rate`}
                    maxLength={5}

                  />

                  <AtTextField
                    placeholder={`Enter Number of ${props.formData.rateType === 'Daily' ? `Days` : `Hours`} Per Week`}
                    maxLength={5}

                  />

                  <AtTypography variant={'caption'} color={grey2}>Please fill the forms above as a {props.formData.rateType.toLowerCase()} rate for whole team.</AtTypography>
                </>

                : ''
            }

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

          />

        </Box>
      </Box>
    </StyledForm>
  )
}

interface Step1Props {
  setFormData: React.Dispatch<React.SetStateAction<FormFields>>
  formData: FormFields
}

export default TeamStep1

