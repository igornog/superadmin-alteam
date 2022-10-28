import { Box } from '@mui/material';
import { Edit } from 'iconsax-react';
import React from 'react';
import AtTag from '../../../../components/AtTag/AtTag';
import AtTalentFrame from '../../../../components/AtTalentFrame/AtTalentFrame';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { useAppDispatch } from '../../../../utils/hooks/reduxHook';
import { Skill, Talent } from '../../../../utils/redux/types/talents.type';

const TalentSkills: React.FunctionComponent<TalentSkillsProps> = (
  props: TalentSkillsProps
) => {
  const dispatch = useAppDispatch();

  return (
    <AtTalentFrame
      title={'Skills'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
    >
      <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
        {props.talent.skills?.map((skill: Skill, index: number) => (
          <AtTag label={skill.label} delete={false} key={index} />
        ))}
      </Box>
    </AtTalentFrame>
  );
};

interface TalentSkillsProps {
  talent: Talent;
}
export default TalentSkills;
