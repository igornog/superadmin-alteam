import { Box } from '@mui/material';
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react';
import React, { useState } from 'react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton';
import AtTypography from '../../AtTypography/AtTypography';
import { ModalSize } from '../../../utils/redux/types/settings.type';
import AtLine from '../../AtLine/AtLine';
import AtModal from '../AtModal';
import AtTextField from '../../AtTextField/AtTextField';
import { TreeInterface } from '../../../utils/redux/types/tree.type';
import { useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleAddFolder } from '../../../utils/redux/actions/tree.action';

const ModalAddFolder: React.FunctionComponent<ModalAddFolderProps> = (
  props: ModalAddFolderProps
) => {
  const dispatch = useAppDispatch();
  const [folderName, setFolderName] = useState('');

  const handleClose = () => {
    props.onClose?.();
    setFolderName('');
  };

  const addNewFolder = () => {
    if (props.folder?.id) {
      dispatch(handleAddFolder({ folderName, targetId: props.folder.id }));
      handleClose();
    }
  };

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
        <AtTypography variant={'h4'}>
          Create Folder{' '}
          {props.folder?.id === 'Parent'
            ? 'at top level'
            : `in ${props.folder?.name}`}
        </AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacing={20} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTextField
          defaultValue={folderName}
          placeholder={'Enter Name'}
          label={'Folder Name'}
          onValueChange={setFolderName}
        />

        <Box display={'flex'} justifyContent={'flex-end'}>
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
            name={'Create'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  );
};

interface ModalAddFolderProps {
  folder?: TreeInterface | undefined;
  isOpen: boolean;
  onClose?: () => void;
}

export default ModalAddFolder;
