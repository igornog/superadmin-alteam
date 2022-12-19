import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React from 'react'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtLine from '../../AtLine/AtLine'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import AtModal from '../AtModal'

const ModalAddNote: React.FunctionComponent<ModalAddNoteProps> = (
  props: ModalAddNoteProps,
) => {
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
        <AtTypography variant={'h4'}>Add Note</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>
      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTextField
          multiline={true}
          rows={12}
          value={''}
          label={'Note'}
          defaultValue={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque adipiscing placerat venenatis odio vel dignissim nec diam. Tincidunt ultrices sed ut odio vestibulum nisl, id vulputate. Gravida mattis bibendum lacus lacus pulvinar egestas proin convallis. Magna sed auctor diam fringilla vestibulum eu.'
          }
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            startIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Add note'}
            startIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalAddNoteProps {
  isOpen: boolean
  onClose?: () => void
}

export default ModalAddNote
