import { Box, CircularProgress, Skeleton } from '@mui/material';
import { Folder } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { black, grey3, grey5, white } from '../../utils/colors';
import { Tree, TreeInterface } from '../../utils/redux/types/tree.type';
import ModalAddFolder from '../AtModal/modals/ModalAddFolder';
import ModalRenameFolder from '../AtModal/modals/ModalRenameFolder';
import ModalShareFolder from '../AtModal/modals/ModalShareFolder';
import AtRightClick from '../AtRightClick/AtRightClick';
import FolderMenu from '../AtRightClick/ContextMenus/FolderMenu';
import AtTypography from '../AtTypography/AtTypography';

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
`;

const AtFolder: React.FunctionComponent<AtFolderProps> = (
  props: AtFolderProps
) => {
  const [openModalAddFolder, setOpenModalAddFolder] = useState(false);
  const [openModalRenameFolder, setOpenModalRenameFolder] = useState(false);
  const [openModalShareFolder, setOpenModalShareFolder] = useState(false);

  const [folder, setFolder] = useState(new Tree({}));

  useEffect(() => {
    if (props.folder) {
      setFolder(new Tree(props.folder));
    }
  }, [props.folder]);

  return (
    <>
      <AtRightClick
        contextMenu={
          <FolderMenu
            openCreateFolder={() => setOpenModalAddFolder(true)}
            openRenameFolder={() => setOpenModalRenameFolder(true)}
            openShareFolder={() => setOpenModalShareFolder(true)}
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

      <ModalAddFolder
        isOpen={openModalAddFolder}
        onClose={() => setOpenModalAddFolder(false)}
        folder={folder}
      />
    </>
  );
};

interface AtFolderProps {
  folder?: TreeInterface;
  loading?: boolean;
  minimize?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default AtFolder;
