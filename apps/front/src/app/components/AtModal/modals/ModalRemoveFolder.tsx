import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TrushSquare } from 'iconsax-react'
import React from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTypography from '../../AtTypography/AtTypography'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtLine from '../../AtLine/AtLine'
import AtModal from '../AtModal'
import { grey2 } from '../../../utils/colors'
import { GroupInterface } from '../../../utils/redux/types/groups.type'

const ModalRemoveFolder: React.FunctionComponent<ModalRemoveFolderProps> = (
  props: ModalRemoveFolderProps,
) => {
  // const [folder, setFolder] = useState(new Tree({}))

  // useEffect(() => {
  //   if (props.folder) {
  //     setFolder(new Tree(props.folder))
  //   }
  // }, [props.folder])

  const handleClose = () => {
    props.onClose?.()
  }

  const removeFolder = () => {
    console.log('Remove Folder')
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
        <AtTypography variant={'h4'}>Delete Folder</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={handleClose}
        />
      </Box>

      <AtLine spacingTop={20} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTypography color={grey2}>
          Are you sure you want to delete folder? Please be avare that the
          folder will be deleted permanently, and talent will be moved out to
          all accepted talent with a “No Folder” badge.
        </AtTypography>

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={handleClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />

          <AtButton
            onClick={removeFolder}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Delete'}
            endIcon={<TrushSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalRemoveFolderProps {
  folder?: GroupInterface | undefined
  isOpen: boolean
  onClose?: () => void
}

export default ModalRemoveFolder
