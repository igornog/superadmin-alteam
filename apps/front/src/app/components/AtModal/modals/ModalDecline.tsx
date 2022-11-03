import { Box } from '@mui/material';
import { CloseSquare, TickSquare } from 'iconsax-react';
import React from 'react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton';
import AtTextField from '../../AtTextField/AtTextField';
import { useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleModal } from '../../../utils/redux/actions/settings.action';
import AtTypography from '../../AtTypography/AtTypography';
import { AtModalHeader, AtModalContent } from '../AtModal';

const ModalDecline: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(handleModal(null));

  return (
    <>
      <AtModalHeader
        title={<AtTypography variant={'h4'}>Decline Talent</AtTypography>}
      />

      <AtModalContent padding={'0 20px 20px 20px'}>
        <Box display={'flex'} flexDirection={'column'} gap={2.5}>
          <AtTextField
            multiline={true}
            rows={12}
            label={'Decline Talent'}
            defaultValue={
              'Thank you a lot for your time and effort to apply to YJCollective. We have an overwhelming amount of applicants and unfortunately, we won’t be progressing with you further. \n \nPlease check for new opportunities and don’t hesitate to apply. \n \nWe wish you all the best of luck with your search.'
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
              name={'Decline'}
              startIcon={<TickSquare size={16} />}
            />
          </Box>
        </Box>
      </AtModalContent>
    </>
  );
};

export default ModalDecline;
