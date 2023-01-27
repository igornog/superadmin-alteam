import { Box } from '@mui/material'
import { CloseCircle, Profile, TrushSquare } from 'iconsax-react'
import React, { useState } from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTypography from '../../AtTypography/AtTypography'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtLine from '../../AtLine/AtLine'
import AtModal from '../AtModal'
import AtTextField from '../../AtTextField/AtTextField'
import { grey3, red } from '../../../utils/colors'
import AtDropdown from '../../AtDropdown/AtDropdown'
import ModalRemoveUser from './ModalRemoveUser'
import { Group } from '../../../utils/redux/types/groups.type'

const ModalShareFolder: React.FunctionComponent<ModalShareFolderProps> = (
  props: ModalShareFolderProps,
) => {
  const [email, setEmail] = useState('')
  const [openRemoveUserModal, setOpenRemoveUserModal] = useState(false)

  const handleClose = () => {
    props.onClose?.()
    setEmail('')
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
        <AtTypography variant={'h4'}>Share Folder</AtTypography>
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
          value={email}
          placeholder={'Enter Email'}
          label={'Invite User'}
          onValueChange={setEmail}
          endIcon={
            <AtDropdown
              $flexibleHeight={true}
              fontSize={'10px'}
              placeholder={'Public View'}
              $listItems={[
                { id: 0, value: 'Public View2', label: 'Public View' },
                { id: 1, value: 'Private View', label: 'Private View' },
              ]}
              padding={'5px 7px'}
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Contained}
            />
          }
        />

        <Box display={'flex'} flexDirection={'column'} gap={'15px'}>
          <AtTypography>
            <Profile size={16} />
            All invited users:
          </AtTypography>

          <AtTypography color={grey3}>No users invited yet.</AtTypography>
          <Box display={'flex'} justifyContent={'space-between'}>
            <AtTypography>yoanndemont@gmail.com</AtTypography>
            <AtDropdown
              align={'bottom-right'}
              fontSize={'10px'}
              placeholder={'Public View'}
              $listItems={[
                {
                  id: 0,
                  value: 'Public View',
                  label: (
                    <AtTypography whiteSpace={'nowrap'}>
                      Public View
                    </AtTypography>
                  ),
                },
                {
                  id: 1,
                  value: 'Private View',
                  label: (
                    <AtTypography whiteSpace={'nowrap'}>
                      Private View
                    </AtTypography>
                  ),
                },
                {
                  id: 2,
                  value: 'Remove User',
                  label: (
                    <Box onClick={() => setOpenRemoveUserModal(true)}>
                      <AtTypography
                        whiteSpace={'nowrap'}
                        color={red}
                        gap={'20px'}
                      >
                        Remove User
                        <TrushSquare size={20} />
                      </AtTypography>
                    </Box>
                  ),
                },
              ]}
              padding={'5px 7px'}
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Text}
            />
          </Box>
        </Box>
      </Box>

      <ModalRemoveUser
        isOpen={openRemoveUserModal}
        onClose={() => setOpenRemoveUserModal(false)}
      />
    </AtModal>
  )
}

interface ModalShareFolderProps {
  folder?: Group | undefined
  isOpen: boolean
  onClose?: () => void
}

export default ModalShareFolder
