import { Box } from '@mui/material';
import { AddCircle, Edit } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import AtTalentFrame from '../../../../components/AtTalentFrame/AtTalentFrame';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { black, grey, grey2, grey3 } from '../../../../utils/colors';
import { useAppDispatch } from '../../../../utils/hooks/reduxHook';
import { handleModal } from '../../../../utils/redux/actions/settings.action';
import { ModalVariant } from '../../../../utils/redux/types/settings.type';
import { Talent } from '../../../../utils/redux/types/talents.type';

const StyledBox = styled(Box)`
  color: ${grey2};
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    cursor: pointer;
    color: ${black};
  }
`;

const TalentNotes: React.FunctionComponent<TalentNotesProps> = (
  props: TalentNotesProps
) => {
  const dispatch = useAppDispatch();

  const handleAddNote = () => {
    dispatch(handleModal(ModalVariant.AddNote));
  };

  return (
    <AtTalentFrame
      title={'Notes'}
      icon={
        <AtTypography>
          <AddCircle size={16} />
          Add note
        </AtTypography>
      }
      onClick={handleAddNote}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'20px'}>
          <AtTypography variant={'body1'}>Yoann Demont’s Note:</AtTypography>

          <StyledBox
            margin={'auto'}
            onClick={() => dispatch(handleModal(ModalVariant.EditNote))}
          >
            <AtTypography>
              <Edit size={16} />
              Edit note
            </AtTypography>
          </StyledBox>
        </Box>

        <AtTypography color={grey3}>23.07.2022</AtTypography>
      </Box>

      <AtTypography color={grey}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
        adipiscing placerat venenatis odio vel dignissim nec diam. Tincidunt
        ultrices sed ut odio vestibulum nisl, id vulputate. Gravida mattis
        bibendum lacus lacus pulvinar egestas proin convallis. Magna sed auctor
        diam fringilla vestibulum eu.
      </AtTypography>
    </AtTalentFrame>
  );
};

interface TalentNotesProps {
  talent: Talent;
}

export default TalentNotes;
