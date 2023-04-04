import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTypography from '../../AtTypography/AtTypography'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtLine from '../../AtLine/AtLine'
import AtModal from '../AtModal'
import AtTextField from '../../AtTextField/AtTextField'
import { useAppDispatch } from '../../../utils/hooks/reduxHook'
import { handleAddGroup } from '../../../utils/redux/actions/group.action'
import { Group, GroupInterface } from '../../../utils/redux/types/groups.type'

const ModalRenameFolder: React.FunctionComponent<ModalRenameFolderProps> = (
  props: ModalRenameFolderProps,
) => {
  const dispatch = useAppDispatch()

  const [folder, setFolder] = useState(new Group({}))
  const [folderName, setFolderName] = useState('')

  useEffect(() => {
    if (props.folder) {
      setFolder(new Group(props.folder))
      setFolderName(props.folder.name)
    }
  }, [props.folder])

  const handleClose = () => {
    props.onClose?.()
    setFolderName(folder.name)
  }

  const addNewFolder = () => {
    if (folder.id) {
      dispatch(handleAddGroup({ folderName, targetId: folder.id }))
      handleClose()
    }
  }

  return (
    <AtModal isOpen={props.isOpen} size={ModalSize.Small} onClose={handleClose}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Rename Folder</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={handleClose}
        />
      </Box>

      <AtLine spacing={20} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTextField
          value={folderName}
          placeholder={'Enter Name'}
          label={'Folder Name'}
          onValueChange={setFolderName}
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={handleClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />

          <AtButton
            onClick={addNewFolder}
            kind={AtButtonKind.Success}
            disabled={!folderName}
            variant={AtButtonVariant.Contained}
            name={'Save'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalRenameFolderProps {
  folder?: GroupInterface | undefined
  isOpen: boolean
  onClose?: () => void
}

export default ModalRenameFolder
