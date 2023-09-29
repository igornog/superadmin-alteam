import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtLine from '../../AtLine/AtLine'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import AtModal from '../AtModal'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
import { handlePatchClient } from '../../../utils/redux/actions/clients.action'
import { handlePatchTalent } from '../../../utils/redux/actions/talents.action'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'

const ModalAddNote: React.FunctionComponent<ModalAddNoteProps> = (
  props: ModalAddNoteProps,
) => {
  const dispatch = useAppDispatch()
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))
  const [id, setId] = useState<number>(0)
  const [author, setAuthor] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [updatedAt, setUpdatedAt] = useState<Date>()

  const handleSaveGeneral = () => {
    props.isClient ?
      dispatch(
        handlePatchClient({
          id: selectedClient.id,
          notes: [{
            id: id,
            author: author,
            text: text,
            createdAt: new Date(),
            updatedAt: updatedAt
          }],
        }),
      ) :
      dispatch(
        handlePatchTalent({
          id: selectedTalent.id,
          notes: [{
            id: id,
            author: author,
            text: text,
            createdAt: new Date(),
            updatedAt: updatedAt
          }],
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
          label={'Author'}
          value={selectedClient.notes && selectedClient.notes[0]?.author}
          onValueChange={setAuthor}
        />

        <AtTextField
          multiline
          rows={12}
          value={''}
          label={'Note'}
          onValueChange={setText}
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
            onClick={handleSaveGeneral}
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
  isClient?: boolean
}

export default ModalAddNote