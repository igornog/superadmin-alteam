import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTextField from '../../AtTextField/AtTextField'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import AtTypography from '../../AtTypography/AtTypography'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtModal from '../AtModal'
import AtLine from '../../AtLine/AtLine'
import AtTextFieldDropdown from '../../AtDropdown/AtTextFieldDropdown'
import { Availability, Experience } from '@yjcapp/app'
import { handlePatchTalent } from '../../../utils/redux/actions/talents.action'

const ModalGeneralInformations: React.FunctionComponent<
  ModalGeneralInformationsProps
> = (props: ModalGeneralInformationsProps) => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))
  const dispatch = useAppDispatch()

  const [role, setRole] = useState<string>()
  const [salary, setSalary] = useState<string>()
  const [availability, setAvailability] = useState<Availability>()
  const [experience, setExperience] = useState<Experience>()
  const [email, setEmail] = useState<string>()
  const [portfolio, setPortfolio] = useState<string | undefined>('')
  const [phone, setPhone] = useState<string>()

  const handleSaveGeneral = () => {
    dispatch(
      handlePatchTalent({
        id: selectedTalent.id,
        role,
        salaryExpectation: salary,
        availability,
        experience,
        email,
        portfolio,
        phoneNumber: phone,
      }),
    )
    props.onClose?.()
  }

  return (
    <AtModal
      isOpen={props.isOpen}
      size={ModalSize.Small}
      onClose={props.onClose}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Edit General Information</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={3.5} padding={2.5}>
        <AtTextField
          defaultValue={selectedTalent.role}
          onValueChange={setRole}
          value={selectedTalent.role ?? ''}
          placeholder={selectedTalent.role ?? 'N/A'}
          label={'Role'}
        />

        <AtTextField
          defaultValue={selectedTalent.salaryExpectation}
          onValueChange={setSalary}
          value={selectedTalent.salaryExpectation ?? ''}
          placeholder={selectedTalent.salaryExpectation ?? 'N/A'}
          label={'Salary Expectations'}
        />

        <AtTextFieldDropdown
          fullWidth={true}
          value={selectedTalent.availability}
          placeholder={'Select Availability'}
          handleSelect={(e) => setAvailability(e.label as Availability)}
          $listItems={Object.values(Availability).map(
            (label: Availability, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          label={'Availability'}
        />

        <AtTextFieldDropdown
          fullWidth={true}
          value={selectedTalent.experience}
          handleSelect={(e) => setExperience(e.label as Experience)}
          placeholder={'Select Work Experience'}
          $listItems={Object.values(Experience).map(
            (label: Experience, index: number) => ({
              id: index,
              label: label,
            }),
          )}
          label={'Work Experience'}
        />

        <AtTextField
          defaultValue={selectedTalent.portfolio}
          value={selectedTalent.portfolio}
          onValueChange={setPortfolio}
          placeholder={selectedTalent.portfolio ?? 'N/A'}
          label={'Portfolio Link'}
        />

        <AtTextField
          defaultValue={selectedTalent.email}
          onValueChange={setEmail}
          value={selectedTalent.email}
          placeholder={selectedTalent.email ?? 'N/A'}
          label={'Email'}
        />

        <AtTextField
          defaultValue={selectedTalent.phoneNumber}
          onValueChange={setPhone}
          value={selectedTalent.phoneNumber}
          placeholder={selectedTalent.phoneNumber ?? 'N/A'}
          label={'Phone Number'}
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={handleSaveGeneral}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalGeneralInformationsProps {
  isOpen: boolean
  onClose?: () => void
}

export default ModalGeneralInformations
