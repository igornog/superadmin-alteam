import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React from 'react'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTextFieldDropdown from '../../AtDropdown/AtTextFieldDropdown'
import AtLine from '../../AtLine/AtLine'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import AtModal from '../AtModal'

const ModalRequest: React.FunctionComponent<ModalRequestProps> = (
  props: ModalRequestProps,
) => {
  return (
    <AtModal isOpen={props.open} size={ModalSize.Small} onClose={props.onClose}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Edit Request</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={'30px'} padding={2.5}>
        <AtTextFieldDropdown
          fullWidth={true}
          value={''}
          placeholder={'App development'}
          $listItems={[
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
          $listItems={[
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
          $listItems={[
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

interface ModalRequestProps {
  open: boolean
  onClose: () => void
}

export default ModalRequest
