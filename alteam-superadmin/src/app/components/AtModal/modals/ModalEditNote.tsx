import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare, Trash } from 'iconsax-react'
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
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import { handlePatchTalent } from '../../../utils/redux/actions/talents.action'

const ModalEditNote: React.FunctionComponent<ModalEditNoteProps> = (
  props: ModalEditNoteProps,
) => {
  const dispatch = useAppDispatch()
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))
  const [author, setAuthor] = useState<string>()
  const [text, setText] = useState<string>()

  const handleSaveGeneral = () => {
    if (props.isClient) {
      if (selectedClient.notes) {
        dispatch(
          handlePatchClient({
            id: selectedClient.id,
            notes: [{
              id: selectedClient.notes[0].id,
              author: author ?? selectedClient.notes[0].author,
              text: text ?? selectedClient.notes[0].text,
              updatedAt: new Date()
            }],
          }),
        )
      }
    } else {
      if (selectedTalent.notes) {
        dispatch(
          handlePatchTalent({
            id: selectedTalent.id,
            notes: [{
              id: selectedTalent.notes[0].id,
              author: author ?? selectedTalent.notes[0].author,
              text: text ?? selectedTalent.notes[0].text,
              updatedAt: new Date()
            }],
          }),
        )
      }
    }

    props.onClose?.()
  }

  const handleDeleteNote = () => {
    if (props.isClient) {
      if (selectedClient.notes) {
        dispatch(
          handlePatchClient({
            id: selectedClient.id,
            notes: [],
          }),
        )
      }
    } else {
      if (selectedTalent.notes) {
        dispatch(
          handlePatchTalent({
            id: selectedTalent.id,
            notes: [],
          }),
        )
      }
    }

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
        <AtTypography variant={'h4'}>Edit Note</AtTypography>
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
          value={selectedClient.notes && selectedClient.notes[0]?.author || selectedTalent.notes && selectedTalent.notes[0]?.author}
          onValueChange={setAuthor}
        />

        <AtTextField
          multiline
          rows={12}
          label={'Note'}
          value={selectedClient.notes && selectedClient.notes[0]?.text || selectedTalent.notes && selectedTalent.notes[0]?.text}
          onValueChange={setText}
        />

        <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} gap={2.5}>
          {selectedClient.notes && selectedClient.notes[0]?.text || selectedTalent.notes && selectedTalent.notes[0]?.text ? (
            <AtButton
              onClick={handleDeleteNote}
              kind={AtButtonKind.Danger}
              variant={AtButtonVariant.Contained}
              name={'Delete note'}
              endIcon={<Trash size={16} />
              }
            />) :
            <AtButton
              onClick={props.onClose}
              kind={AtButtonKind.Danger}
              variant={AtButtonVariant.Text}
              name={'Cancel'}
              startIcon={<CloseSquare size={16} />}
            />}
          <AtButton
            onClick={handleSaveGeneral}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save note'}
            startIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalEditNoteProps {
  isOpen: boolean
  onClose?: () => void
  isClient?: boolean
}

export default ModalEditNote
