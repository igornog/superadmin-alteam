import { Box, BoxProps, Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';
import { black } from '../../utils/colors';
import { convertHexToRGBA } from '../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook';
import { modals } from './modals';
import { handleModal } from '../../utils/redux/actions/settings.action';
import { Modal } from '../../utils/redux/types/settings.type';
import { CloseCircle } from 'iconsax-react';
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton';
import AtLine from '../AtLine/AtLine';

const AtModal: React.FunctionComponent = () => {
  const [modalSettings, setModalSettings] = useState(new Modal({}));

  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(handleModal(null));

  const selectedModal = settings.selectedModal;

  useEffect(() => {
    if (selectedModal) {
      setModalSettings(new Modal(modals[selectedModal]));
    }
  }, [selectedModal]);

  return (
    <Dialog
      open={selectedModal !== null}
      TransitionComponent={Transition}
      keepMounted={true}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={modalSettings.size}
      BackdropProps={{
        style: {
          backgroundColor: convertHexToRGBA(black, 0.5),
        },
      }}
      PaperProps={{
        style: {
          padding: 0,
          boxShadow: 'none',
        },
      }}
    >
      {modalSettings.content}
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

export const AtModalHeader: React.FunctionComponent<AtModalHeaderProps> = (
  props: AtModalHeaderProps
) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(handleModal(null));

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        {props.title}
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          iconSize={24}
          onClick={handleClose}
        />
      </Box>
      <AtLine spacing={20} />
    </>
  );
};

interface AtModalHeaderProps {
  title?: React.ReactNode;
}

export const AtModalContent: React.FunctionComponent<AtModalContentProps> = (
  props: AtModalContentProps
) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      padding={props.padding ?? '15px 20px 20px 20px'}
      gap={props.gap ?? '25px'}
      {...props}
    />
  );
};

interface AtModalContentProps extends BoxProps {
  children: React.ReactNode;
}
