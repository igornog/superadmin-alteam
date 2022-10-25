import { Box } from '@mui/material';
import { ArrowRight2 } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import { green, grey, grey3, grey5, white } from '../../utils/colors';
import AtLine from '../AtLine/AtLine';
import AtGroupTag from '../AtGroupTag/AtGroupTag';
import AtTypography from '../AtTypography/AtTypography';
import AtTag from '../AtTag/AtTag';
import { Skill, Talent } from '../../utils/redux/types/talents.type';

const StyledCard = styled.div`
  background-color: ${white};
  border: 1px solid ${grey5};
  border-radius: 10px;
  padding: 20px;
  transition: 0.3s;
  min-height: 120px;

  &:hover {
    transition: 0.3s;
    cursor: pointer;
    border-color: ${green};
  }
`;

const AtCard: React.FunctionComponent<AtCardProps> = (props: AtCardProps) => {
  const talent = new Talent(props.talent);

  return (
    <StyledCard onClick={props.onClick}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} gap={'5px'} flexDirection={'column'}>
          <Box display={'flex'} gap={'5px'} alignItems={'center'}>
            <AtTypography variant={'h5'}>{talent.fullName}</AtTypography>
            {talent.group && <AtGroupTag label={talent.group} />}
          </Box>
          <AtTypography variant={'body1'} color={grey}>
            {talent.jobName}
          </AtTypography>
        </Box>

        <Box
          display={'flex'}
          gap={'5px'}
          flexDirection={'column'}
          alignItems={'flex-end'}
        >
          <Box display={'flex'} gap={'10px'} alignItems={'center'}>
            <AtTypography color={grey3}>Applied: {talent.applied}</AtTypography>
            <AtGroupTag icon={<ArrowRight2 size={10} />} />
          </Box>
          <AtTypography variant={'body1'} color={grey}>
            {talent.jobType}
          </AtTypography>
        </Box>
      </Box>

      <AtLine spacing={16} />
      {/* 
      <Box display={'flex'}>
        <AtTypography color={grey3}>Applied to:&nbsp;</AtTypography>
        <AtTypography>
          Solo60... &gt; App, Ticknovate... &gt; Dev See all
        </AtTypography>
      </Box>

      <AtLine spacing={16} />
 */}
      {talent.skills && talent.skills.length > 0 ? (
        <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
          {talent.skills?.map((skill: Skill, index: number) => (
            <AtTag label={skill.label} delete={false} key={index} />
          ))}
        </Box>
      ) : (
        <AtTypography color={grey3}>
          No skills been added by {talent.fullName}
        </AtTypography>
      )}
    </StyledCard>
  );
};

interface AtCardProps {
  talent?: Talent;
  onClick?: (e: React.MouseEvent) => void;
}

export default AtCard;
