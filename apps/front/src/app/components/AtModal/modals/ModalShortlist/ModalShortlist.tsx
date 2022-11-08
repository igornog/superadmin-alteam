import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AtTypography from '../../../AtTypography/AtTypography';
import { ArrowRight, CloseCircle, CloseSquare } from 'iconsax-react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../AtButton/AtButton';
import { useAppDispatch } from '../../../../utils/hooks/reduxHook';
import { ModalSize } from '../../../../utils/redux/types/settings.type';
import AtModal from '../../AtModal';
import AtLine from '../../../AtLine/AtLine';
import { handleLoadTree } from '../../../../utils/redux/actions/tree.action';
import ModalShortlistStep1 from './steps/ModalShortlistStep1';
import { black, grey2 } from '../../../../utils/colors';
import ModalShortlistStep2 from './steps/ModalShortlistStep2';
import ModalShortlistStep3 from './steps/ModalShortlistStep3';
import AtTabs from '../../../AtTabs/AtTabs';

const ModalShortlist: React.FunctionComponent<ModalShortlistProps> = (
  props: ModalShortlistProps
) => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);

  const nodes = {
    id: 'Parent',
    name: 'Create Parent Folder',
    children: [
      {
        id: '1',
        name: 'Development',
        children: [
          {
            id: '2',
            name: 'Front-end',
          },
        ],
      },
      {
        id: '3',
        name: 'Solo60',
        children: [
          {
            id: '4',
            name: 'Child - 4',
          },
          {
            id: '5',
            name: 'Child - 5',
            children: [
              {
                id: '6',
                name: 'Child - 7',
              },
              {
                id: '7',
                name: 'Child - 8',
              },
              {
                id: '8',
                name: 'Child - 9',
              },
            ],
          },
          {
            id: '9',
            name: 'Child - 6',
            children: [
              {
                id: '10',
                name: 'Child - 4',
              },
              {
                id: '11',
                name: 'Child - 10',
                children: [
                  {
                    id: '12',
                    name: 'Child - 7',
                  },
                  {
                    id: '13',
                    name: 'Child - 8',
                  },
                  {
                    id: '14',
                    name: 'Child - 9',
                  },
                  {
                    id: '15',
                    name: 'Child - 11',
                  },
                  {
                    id: '16',
                    name: 'Child - 12',
                  },
                  {
                    id: '17',
                    name: 'Child - 13',
                  },
                ],
              },
            ],
          },
          {
            id: '18',
            name: 'Child - 14',
          },
        ],
      },
    ],
  };

  useEffect(() => {
    dispatch(handleLoadTree(nodes));
  }, [dispatch, nodes]);

  const moveTalent = () => {
    console.log('move talent');
  };

  const handleClose = () => {
    props.onClose();
    setStep(0);
  };

  return (
    <AtModal
      isOpen={props.isOpen}
      size={ModalSize.Small}
      onClose={handleClose}
      minWidth={step === 2 ? '50vw' : '25vw'}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <Box display={'flex'} gap={'15px'}>
          <AtTypography variant={'h4'}>Shortlist Talent</AtTypography>
          <AtTypography color={grey2}>
            Step{' '}
            <Box>
              <span style={{ color: black }}>{step + 1}</span>/3
            </Box>
          </AtTypography>
        </Box>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          iconSize={24}
          onClick={handleClose}
        />
      </Box>

      <AtLine spacingTop={20} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTabs
          tabs={[
            {
              id: 0,
              content: <ModalShortlistStep1 />,
            },
            {
              id: 1,
              content: <ModalShortlistStep2 />,
            },
            {
              id: 2,
              content: <ModalShortlistStep3 />,
            },
          ]}
          step={step}
        />

        <Box display={'flex'} justifyContent={'flex-end'}>
          <AtButton
            onClick={step === 0 ? handleClose : () => setStep(step - 1)}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={step === 0 ? 'Cancel' : 'Previous Step'}
            endIcon={<CloseSquare size={16} />}
          />

          <Box display={'flex'} gap={'20px'}>
            <AtButton
              onClick={() => (step === 2 ? moveTalent() : setStep(step + 1))}
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Outlined}
              name={step === 2 ? 'Skip Step and Move' : 'Skip Step'}
              endIcon={<CloseSquare size={16} />}
            />
            <AtButton
              onClick={() => (step === 2 ? moveTalent() : setStep(step + 1))}
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={step === 2 ? 'Send Message and Move' : 'Next Step'}
              endIcon={<ArrowRight size={16} />}
            />
          </Box>
        </Box>
      </Box>
    </AtModal>
  );
};

interface ModalShortlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export default ModalShortlist;
