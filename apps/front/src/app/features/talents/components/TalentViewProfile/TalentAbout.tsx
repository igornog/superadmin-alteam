import { Edit } from 'iconsax-react';
import React from 'react';
import AtTalentFrame from '../../../../components/AtTalentFrame/AtTalentFrame';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey } from '../../../../utils/colors';
import { useAppDispatch } from '../../../../utils/hooks/reduxHook';
import { handleModal } from '../../../../utils/redux/actions/settings.action';
import { ModalVariant } from '../../../../utils/redux/types/settings.type';
import { Talent } from '../../../../utils/redux/types/talents.type';

const TalentAbout: React.FunctionComponent<TalentAboutProps> = (
  props: TalentAboutProps
) => {
  const dispatch = useAppDispatch();

  const handleEditAbout = () => {
    dispatch(handleModal(ModalVariant.About));
  };

  return (
    <AtTalentFrame
      title={'About Talent'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={handleEditAbout}
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
