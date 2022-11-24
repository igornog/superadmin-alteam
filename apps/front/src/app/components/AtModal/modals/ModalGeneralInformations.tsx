import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTextField from '../../AtTextField/AtTextField'
import { useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import AtTypography from '../../AtTypography/AtTypography'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtModal from '../AtModal'
import AtLine from '../../AtLine/AtLine'
import AtTextFieldDropdown from '../../AtDropdown/AtTextFieldDropdown'

const ModalGeneralInformations: React.FunctionComponent<
  ModalGeneralInformationsProps
> = (props: ModalGeneralInformationsProps) => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))

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
          iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={3.5} padding={2.5}>
        <AtTextField
          defaultValue={selectedTalent.jobName}
          value={''}
          placeholder={selectedTalent.jobName ?? 'N/A'}
          label={'Role'}
        />

        <AtTextField
          defaultValue={selectedTalent.salary}
          value={''}
          placeholder={selectedTalent.salary ?? 'N/A'}
          label={'Salary Expectations'}
        />

        <AtTextFieldDropdown
          fullWidth={true}
          value={''}
          placeholder={'Select Availability'}
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
          label={'Availability'}
        />

        <AtTextFieldDropdown
          fullWidth={true}
          placeholder={'Select Work Experience'}
          value={''}
          listItems={[
            {
              id: 0,
              label: 'Senior',
            },
            {
              id: 1,
              label: 'Junior',
            },
          ]}
          label={'Work Experience'}
        />

        <AtTextField
          defaultValue={selectedTalent.portfolio}
          value={''}
          placeholder={selectedTalent.portfolio ?? 'N/A'}
          label={'Portfolio Link'}
        />

        <AtTextField
          defaultValue={selectedTalent.email}
          value={''}
          placeholder={selectedTalent.email ?? 'N/A'}
          label={'Email'}
        />

        <AtTextField
          defaultValue={selectedTalent.phone}
          value={''}
          placeholder={selectedTalent.phone ?? 'N/A'}
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
            onClick={props.onClose}
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
