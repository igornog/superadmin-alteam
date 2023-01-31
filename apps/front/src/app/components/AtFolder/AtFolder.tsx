import { Box, CircularProgress, Skeleton } from '@mui/material'
import { Folder } from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { black, grey3, grey5, white } from '../../utils/colors'
import AtRightClick from '../AtRightClick/AtRightClick'
import FolderMenu from '../AtRightClick/ContextMenus/FolderMenu'
import AtTypography from '../AtTypography/AtTypography'
import ModalAddFolder from '../AtModal/modals/ModalAddFolder'
import ModalAssignFolderToClient from '../AtModal/modals/ModalAssignFolderToClient'
import ModalRemoveFolder from '../AtModal/modals/ModalRemoveFolder'
import ModalRenameFolder from '../AtModal/modals/ModalRenameFolder'
import ModalShareFolder from '../AtModal/modals/ModalShareFolder'
import { Group, GroupInterface } from '../../utils/redux/types/groups.type'

const StyledFolder = styled.div<{ minimize?: boolean }>`
  width: 100%;
  height: ${({ minimize }) => (minimize ? '60px' : '200px')};
  background: ${white};
  border-radius: 5px;
  border: 1px solid ${grey5};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ minimize }) => (minimize ? 'flex-start' : 'center')};
  gap: 20px;
  color: ${grey3};
  transition: color 0.3s;

  &:hover {
    transition: color 0.3s;
    cursor: pointer;
    color: ${black};
  }
`

const AtFolder: React.FunctionComponent<AtFolderProps> = (
  props: AtFolderProps,
) => {
  const [openModalAddFolder, setOpenModalAddFolder] = useState(false)
  const [openModalRenameFolder, setOpenModalRenameFolder] = useState(false)
  const [openModalShareFolder, setOpenModalShareFolder] = useState(false)
  const [openModalRemoveFolder, setOpenModalRemoveFolder] = useState(false)
  const [openAssignFolderToClient, setOpenAssignFolderToClient] =
    useState(false)

  const folder = new Group({ ...props.folder })

  return (
    <>
      <AtRightClick
        contextMenu={
          <FolderMenu
            openCreateFolder={() => setOpenModalAddFolder(true)}
            openRenameFolder={() => setOpenModalRenameFolder(true)}
            openShareFolder={() => setOpenModalShareFolder(true)}
            openRemoveFolder={() => setOpenModalRemoveFolder(true)}
            openAssignFolderToClient={() => setOpenAssignFolderToClient(true)}
          />
        }
      >
        <StyledFolder onClick={props.onClick} minimize={props.minimize}>
          {props.loading ? (
            <Box
              display={'flex'}
              flexDirection={props.minimize ? 'row' : 'column'}
              alignItems={'center'}
              gap={props.minimize ? '5px' : '20px'}
            >
              <CircularProgress color={'secondary'} />
              <Skeleton animation="wave" width={'100%'} />
            </Box>
          ) : (
            <Box
              display={'flex'}
              flexDirection={props.minimize ? 'row' : 'column'}
              alignItems={'center'}
              gap={props.minimize ? '5px' : '20px'}
              paddingLeft={props.minimize ? '20px' : '0'}
            >
              <Folder size={props.minimize ? 20 : 40} />
              <AtTypography variant={props.minimize ? 'body1' : 'h5'}>
                {folder.name}
              </AtTypography>
            </Box>
          )}
        </StyledFolder>
      </AtRightClick>

      <ModalRenameFolder
        isOpen={openModalRenameFolder}
        onClose={() => setOpenModalRenameFolder(false)}
        folder={folder}
      />

      <ModalShareFolder
        isOpen={openModalShareFolder}
        onClose={() => setOpenModalShareFolder(false)}
        folder={folder}
      />

      <ModalAssignFolderToClient
        isOpen={openAssignFolderToClient}
        onClose={() => setOpenAssignFolderToClient(false)}
        folder={folder}
      />

      <ModalAddFolder
        isOpen={openModalAddFolder}
        onClose={() => setOpenModalAddFolder(false)}
        folder={folder}
      />

      <ModalRemoveFolder
        isOpen={openModalRemoveFolder}
        onClose={() => setOpenModalRemoveFolder(false)}
        folder={folder}
      />
    </>
  )
}

interface AtFolderProps {
  folder?: GroupInterface
  loading?: boolean
  minimize?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default AtFolder
