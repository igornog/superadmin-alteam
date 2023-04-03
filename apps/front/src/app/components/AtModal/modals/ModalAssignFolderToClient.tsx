import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTypography from '../../AtTypography/AtTypography'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtLine from '../../AtLine/AtLine'
import AtModal from '../AtModal'
import { grey2, grey3, grey5 } from '../../../utils/colors'
import styled from 'styled-components'
import AtDropdown from '../../AtDropdown/AtDropdown'
import { Group } from '../../../utils/redux/types/groups.type'

const StyledDropdown = styled(AtDropdown)`
  justify-content: space-between;
  width: 100%;
  border-color: ${grey5};
  color: ${grey3};
`

const ModalAssignFolderToClient: React.FunctionComponent<
  ModalAssignFolderToClientProps
> = (props: ModalAssignFolderToClientProps) => {
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
        <AtTypography variant={'h4'}>Assign Folder to Client</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={handleClose}
        />
      </Box>

      <AtLine spacingTop={20} />

      <Box display={'flex'} flexDirection={'column'} gap={'30px'} padding={2.5}>
        <AtTypography color={grey2}>
          Please select client that you want to assign this folder to. We won’t
          make any changes to the folders inside this folder but the name of
          this folder will be changed to the clients name and taken the image if
          any.
        </AtTypography>

        <StyledDropdown
          $listItems={[
            { id: 0, value: 'None', label: 'None' },
            { id: 1, value: 'None', label: 'None' },
          ]}
          label={'Select Client'}
          padding={'25px 20px'}
          placeholder={'Select Client'}
          align={'bottom-right'}
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Outlined}
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
            onClick={removeFolder}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Assign'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalAssignFolderToClientProps {
  folder?: Group | undefined
  isOpen: boolean
  onClose?: () => void
}

export default ModalAssignFolderToClient
