import { Box } from '@mui/material';
import { CloseSquare, ArrowRight2, TickSquare } from 'iconsax-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../AtButton/AtButton';
import AtTabs from '../../../../AtTabs/AtTabs';
import AtTag from '../../../../AtTag/AtTag';
import ModalCreateTalentStep1 from './steps/ModalCreateTalentStep1';
import ModalCreateTalentStep2 from './steps/ModalCreateTalentStep2';
import ModalCreateTalentStep3 from './steps/ModalCreateTalentStep3';

const CreateTalent: React.FunctionComponent<CreateTalentProps> = (
  props: CreateTalentProps
) => {
  const handleClose = () => {
    props.handleClose();
    props.setStep(0);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
      <AtTabs
        tabs={[
          {
            id: 0,
            content: <ModalCreateTalentStep1 />,
          },
          {
            id: 1,
            content: <ModalCreateTalentStep2 />,
          },
          {
            id: 2,
            content: <ModalCreateTalentStep3 />,
          },
        ]}
        step={props.step}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
        <AtTag label={'filenamemightbethislong.pdf'} delete={true} />
        <AtTag label={'filenamemightbethislong.pdf'} delete={true} />
      </Box>

      <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
        <AtButton
          onClick={handleClose}
          kind={AtButtonKind.Danger}
          variant={AtButtonVariant.Text}
          name={'Cancel'}
          endIcon={<CloseSquare size={16} />}
        />

        {props.step === 2 && (
          <AtButton
            onClick={handleClose}
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Outlined}
            name={'Skip & Done'}
            endIcon={<CloseSquare size={16} />}
          />
        )}

        <AtButton
          onClick={() => props.setStep(props.step + 1)}
          kind={AtButtonKind.Success}
          variant={AtButtonVariant.Contained}
          name={props.step === 2 ? 'Done' : 'Next Step'}
          endIcon={
            props.step === 2 ? <TickSquare /> : <ArrowRight2 size={16} />
          }
        />
      </Box>
    </Box>
  );
};

interface CreateTalentProps {
  handleClose: () => void;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export default CreateTalent;
