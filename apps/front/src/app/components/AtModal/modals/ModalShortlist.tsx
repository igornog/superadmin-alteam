import { Box } from '@mui/material';
import React from 'react';
import { grey2 } from '../../../utils/colors';
import AtTypography from '../../AtTypography/AtTypography';
import { AtModalHeader, AtModalContent } from '../AtModal';
import { ArrowRight, CloseSquare } from 'iconsax-react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton';
import { useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleModal } from '../../../utils/redux/actions/settings.action';
import AtTree, { TreeInterface } from '../../AtTree/AtTree';

const ModalShortlist: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(handleModal(null));

  const nodes: TreeInterface = {
    id: 'root',
    name: 'Parent',
    children: [
      {
        id: '1',
        name: 'Child - 1',
      },
      {
        id: '3',
        name: 'Child - 3',
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
                id: '7',
                name: 'Child - 7',
              },
              {
                id: '8',
                name: 'Child - 8',
              },
              {
                id: '9',
                name: 'Child - 9',
              },
            ],
          },
          {
            id: '6',
            name: 'Child - 6',
            children: [
              {
                id: '4',
                name: 'Child - 4',
              },
              {
                id: '10',
                name: 'Child - 10',
                children: [
                  {
                    id: '7',
                    name: 'Child - 7',
                  },
                  {
                    id: '8',
                    name: 'Child - 8',
                  },
                  {
                    id: '9',
                    name: 'Child - 9',
                  },
                  {
                    id: '11',
                    name: 'Child - 11',
                  },
                  {
                    id: '12',
                    name: 'Child - 12',
                  },
                  {
                    id: '13',
                    name: 'Child - 13',
                  },
                ],
              },
            ],
          },
          {
            id: '14',
            name: 'Child - 14',
          },
        ],
      },
    ],
  };

  return (
    <>
      <AtModalHeader
        title={
          <Box display={'flex'} gap={'15px'} alignItems={'center'}>
            <AtTypography variant={'h4'}>Shortlist Talent</AtTypography>
            <AtTypography color={grey2}>Step 1/3</AtTypography>
          </Box>
        }
      />

      <AtModalContent padding={'0 20px 20px 20px'} height={'50vh'}>
        <AtTree data={nodes} />

        <Box display={'flex'} justifyContent={'flex-end'}>
          <AtButton
            onClick={handleClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />

          <Box display={'flex'} gap={'20px'}>
            <AtButton
              onClick={handleClose}
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Outlined}
              name={'Skip Step'}
              endIcon={<CloseSquare size={16} />}
            />
            <AtButton
              onClick={handleClose}
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={'Next Step'}
              endIcon={<ArrowRight size={16} />}
            />
          </Box>
        </Box>
      </AtModalContent>
    </>
  );
};

export default ModalShortlist;
