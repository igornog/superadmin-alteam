import { Box } from '@mui/material';
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react';
import React from 'react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton';
import AtTextField from '../../AtTextField/AtTextField';
import AtTypography from '../../AtTypography/AtTypography';
import AtModal from '../AtModal';
import AtLine from '../../AtLine/AtLine';
import { ModalSize } from '../../../utils/redux/types/settings.type';

const ModalAbout: React.FunctionComponent<ModalAboutProps> = (
  props: ModalAboutProps
) => {
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
        <AtTypography variant={'h4'}>Edit About Talent</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
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
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  );
};

interface ModalAboutProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default ModalAbout;
