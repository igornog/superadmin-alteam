import { Box } from '@mui/material';
import { AddCircle, Edit } from 'iconsax-react';
import React from 'react';
import AtTalentFrame from '../../../../components/AtTalentFrame/AtTalentFrame';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey, grey2, grey3 } from '../../../../utils/colors';
import { Talent } from '../../../../utils/redux/types/talents.type';

const TalentNotes: React.FunctionComponent<TalentNotesProps> = (
  props: TalentNotesProps
) => {
  return (
    <AtTalentFrame
      title={'Notes'}
      icon={
        <AtTypography>
          <AddCircle size={16} />
          Add note
        </AtTypography>
      }
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={'20px'}>
          <AtTypography variant={'body1'}>Yoann Demont’s Note:</AtTypography>

          <AtTypography color={grey2}>
            <Edit size={16} />
            Edit note
          </AtTypography>
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
