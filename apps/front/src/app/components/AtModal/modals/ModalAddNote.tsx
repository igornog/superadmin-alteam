import { Box } from '@mui/material';
import { CloseSquare, TickSquare } from 'iconsax-react';
import React from 'react';
import { useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleModal } from '../../../utils/redux/actions/settings.action';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton';
import AtTextField from '../../AtTextField/AtTextField';
import AtTypography from '../../AtTypography/AtTypography';
import { AtModalHeader, AtModalContent } from '../AtModal';

const ModalAddNote: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(handleModal(null));

  return (
    <>
      <AtModalHeader
        title={<AtTypography variant={'h4'}>Add Note</AtTypography>}
      />

      <AtModalContent padding={'10px 20px 20px 20px'}>
        <Box display={'flex'} flexDirection={'column'} gap={2.5}>
          <AtTextField
            multiline={true}
            rows={12}
            label={'Note'}
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
              startIcon={<CloseSquare size={16} />}
            />
            <AtButton
              onClick={handleClose}
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={'Add note'}
              startIcon={<TickSquare size={16} />}
            />
          </Box>
        </Box>
      </AtModalContent>
    </>
  );
};

export default ModalAddNote;
