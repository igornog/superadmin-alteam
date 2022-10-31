import { Box } from '@mui/material';
import { CloseSquare, TickSquare } from 'iconsax-react';
import React from 'react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../components/AtButton/AtButton';
import AtTextField from '../../components/AtTextField/AtTextField';
import { useAppDispatch } from '../hooks/reduxHook';
import { handleModal } from '../redux/actions/settings.action';

const ModalAbout: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(handleModal(null));

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2.5}>
      <AtTextField
        multiline={true}
        rows={12}
        label={'About Talent'}
        defaultValue={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque adipiscing placerat venenatis odio vel dignissim nec diam. Tincidunt ultrices sed ut odio vestibulum nisl, id vulputate. Gravida mattis bibendum lacus lacus pulvinar egestas proin convallis. Magna sed auctor diam fringilla vestibulum eu.'
        }
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
          onClick={handleClose}
          kind={AtButtonKind.Success}
          variant={AtButtonVariant.Contained}
          name={'Save Changes'}
          endIcon={<TickSquare size={16} />}
        />
      </Box>
    </Box>
  );
};

export default ModalAbout;
