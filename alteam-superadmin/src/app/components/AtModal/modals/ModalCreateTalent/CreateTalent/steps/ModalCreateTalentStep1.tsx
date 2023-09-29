import { Box } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { grey2 } from '../../../../../../utils/colors'
import AtTextFieldDropdown from '../../../../../AtDropdown/AtTextFieldDropdown'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { Availability, Experience, RateType } from '@yjcapp/app'

const ModalCreateTalentStep1: React.FunctionComponent<
  ModalCreateTalentStep1Props
> = (props: ModalCreateTalentStep1Props) => {
  const [rateType, setRateType] = useState<RateType>()

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
      <AtTypography color={grey2}>
        Please fill the forms above and press the button to invite talent. We
        will send the link to the talent and as soon as the talent will apply
        the profile will appear on the inbound talent link
      </AtTypography>

      <AtTextField
        placeholder={'Enter First Name'}
        value={props.firstName}
        required
        label={'First Name'}
        onValueChange={props.setFirstName}
      />

      <AtTextField
        placeholder={'Enter Last Name'}
        value={props.lastName}
        required
        label={'Last Name'}
        onValueChange={props.setLastName}
      />

      <AtTextField
        placeholder={'Enter Email'}
        value={props.email}
        required
        label={'Email'}
        onValueChange={props.setEmail}
      />

      <AtTextField
        placeholder={'Enter Phone Number'}
        value={props.phoneNumber}
        required
        label={'Phone Number'}
        onValueChange={props.setPhoneNumber}
      />

      <AtTextField
        placeholder={'Enter Portfolio Link'}
        value={props.portfolio}
        label={'Portfolio Link'}
        onValueChange={props.setPortfolio}
      />

      <AtTextField
        placeholder={'Enter Role'}
        value={props.role}
        required
        label={'Role'}
        onValueChange={props.setRole}
      />

      <AtTextFieldDropdown
        fullWidth
        handleselect={(e) => props.setExperience(e.label as Experience)}
        value={props.experience ?? undefined}
        placeholder={'Select Experience Level'}
        required
        $listItems={Object.values(Experience).map(
          (label: Experience, index: number) => ({ id: index, label: label }),
        )}
        label={'Experience Level'}
      />

      <AtTextField
        placeholder={'Enter Salary Expectations'}
        value={props.salaryExpectation}
        required
        label={'Salary Expectations'}
        onValueChange={props.setSalaryExpectation}
      />

      <AtTextFieldDropdown
        fullWidth
        handleselect={(e) => props.setAvailability(e.label as Availability)}
        value={props.availability ?? undefined}
        placeholder={'Select Availability'}
        required
        $listItems={Object.values(Availability).map(
          (label: Availability, index: number) => ({ id: index, label: label }),
        )}
        label={'Availability'}
      />

      <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
        <AtTextFieldDropdown
          fullWidth
          required
          placeholder={'Select Day Rate'}
          $listItems={Object.values(RateType).map(
            (label: RateType, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          handleselect={(e) => setRateType(e.label as RateType)}
          label={'Day Rate'}
        />

        <Box display={'flex'} gap={'16px'}>
          {rateType && (
            <AtTextField
              placeholder={
                rateType === RateType.Variable
                  ? 'Day Rate From'
                  : 'Enter Exact Day Rate'
              }
              maxLength={30}
              // value={project.rateFrom?.toString()}
              // onValueChange={(e) =>
              //   setProject({
              //     ...project,
              //     rateFrom: parseFloat(e),
              //   })
              // }
            />
          )}

          {rateType === RateType.Variable && (
            <AtTextField
              placeholder={'Day Rate To'}
              maxLength={30}
              // value={project.rateTo?.toString()}
              // onValueChange={(e) =>
              //   setProject({
              //     ...project,
              //     rateTo: parseFloat(e),
              //   })
              // }
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

interface ModalCreateTalentStep1Props {
  firstName: string
  setFirstName: Dispatch<SetStateAction<string>>
  lastName: string
  setLastName: Dispatch<SetStateAction<string>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  phoneNumber: string
  setPhoneNumber: Dispatch<SetStateAction<string>>
  salaryExpectation: string
  setSalaryExpectation: Dispatch<SetStateAction<string>>
  role: string
  setRole: Dispatch<SetStateAction<string>>
  experience: Experience | undefined
  setExperience: Dispatch<SetStateAction<Experience | undefined>>
  availability: Availability | undefined
  setAvailability: Dispatch<SetStateAction<Availability | undefined>>
  portfolio: string
  setPortfolio: Dispatch<SetStateAction<string>>
}

export default ModalCreateTalentStep1
