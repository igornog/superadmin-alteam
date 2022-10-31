import { Box, Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { CloseCircle } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook';
import { modals } from '../../utils/modals/modals';
import { handleModal } from '../../utils/redux/actions/settings.action';
import { Modal } from '../../utils/redux/types/settings.type';
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton';

const AtModal: React.FunctionComponent = () => {
  const [modalSettings, setModalSettings] = useState(new Modal({}));

  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(handleModal(null));

  const selectedModal = settings.selectedModal;
  const open = selectedModal !== null;

  useEffect(() => {
    if (selectedModal) {
      setModalSettings(new Modal(modals[selectedModal]));
    }
  }, [selectedModal]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted={true}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth={true}
      maxWidth={modalSettings.size}
    >
      <DialogTitle variant="h4" sx={{ padding: 2.5 }}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {modalSettings.title}
          <AtButton
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Text}
            startIcon={<CloseCircle />}
            iconSize={24}
            onClick={handleClose}
          />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: 2.5, borderBottom: 0 }} dividers={true}>
        {modalSettings.content}
      </DialogContent>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default AtModal;
