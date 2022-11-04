import { Box } from '@mui/material';
import React, { useState } from 'react';
import AtTypography from '../../AtTypography/AtTypography';
import { ArrowRight, CloseCircle, CloseSquare } from 'iconsax-react';
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton';
import { useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleModal } from '../../../utils/redux/actions/settings.action';
import AtTree, { TreeInterface } from '../../AtTree/AtTree';
import {
  ModalSize,
  ModalVariant,
} from '../../../utils/redux/types/settings.type';
import AtModal from '../AtModal';
import AtLine from '../../AtLine/AtLine';
import { grey2 } from '../../../utils/colors';

const ModalShortlist: React.FunctionComponent<ModalShortlistProps> = (
  props: ModalShortlistProps
) => {
  const dispatch = useAppDispatch();
  const handleClose = () =>
    dispatch(handleModal({ name: ModalVariant.Shortlist, state: false }));

  const [nodes, setNodes] = useState<TreeInterface>(
    {
      id: 'Parent',
      name: 'Create Parent Folder',
      children: [
        {
          id: '40',
          name: 'Development',
          children: [
            {
              id: '41',
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
    }
    //     {
    //       id: '1430',
    //       name: 'Solo61',
    //       children: [
    //         {
    //           id: '1431',
    //           name: 'Design',
    //         },
    //       ],
    //     },
    //     {
    //       id: '100',
    //       name: 'Solo60',
    //       children: [
    //         {
    //           id: '101',
    //           name: 'Design',
    //           children: [
    //             { id: '102', name: 'Folder 1' },
    //             { id: '107', name: 'Folder 7' },
    //             {
    //               id: '103',
    //               name: 'Folder 3',
    //               children: [{ id: '106', name: 'Folder 6' }],
    //             },
    //             { id: '104', name: 'Folder 4' },
    //             {
    //               id: '105',
    //               name: 'Folder 5',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ]
  );

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
        <AtTypography variant={'h4'}>Shortlist Talent</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTypography color={grey2}>
          Please select folders you want this user to be moved to. You can
          select multiple folders/clients, and select folders inside.{' '}
        </AtTypography>

        <AtTree
          data={nodes}
          // updateNodes={setNodes}
        />

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
      </Box>
    </AtModal>
  );
};

interface ModalShortlistProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default ModalShortlist;
