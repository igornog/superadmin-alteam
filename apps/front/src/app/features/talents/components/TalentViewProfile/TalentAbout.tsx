import { Edit } from 'iconsax-react';
import React from 'react';
import AtTalentFrame from '../../../../components/AtTalentFrame/AtTalentFrame';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey } from '../../../../utils/colors';
import { Talent } from '../../../../utils/redux/types/talents.type';

const TalentAbout: React.FunctionComponent<TalentAboutProps> = (
  props: TalentAboutProps
) => {
  return (
    <AtTalentFrame
      title={'About Talent'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
    >
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

interface TalentAboutProps {
  talent: Talent;
}

export default TalentAbout;
