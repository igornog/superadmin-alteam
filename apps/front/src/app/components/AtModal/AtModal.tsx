import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react';
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
      keepMounted
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
      <DialogContent
        sx={{ paddingTop: 2.5, paddingBottom: 0, borderBottom: 0 }}
        dividers={true}
      >
        {modalSettings.content}
      </DialogContent>
      <DialogActions sx={{ padding: 2.5 }}>
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
          name={'Save Changes'}
          startIcon={<TickSquare size={16} />}
        />
      </DialogActions>
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
