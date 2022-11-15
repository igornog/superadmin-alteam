import { Box } from '@mui/material';
import { ArrowRight2 } from 'iconsax-react';
import React from 'react';
import styled, { css } from 'styled-components';
import { green, grey, grey3, grey5, white } from '../../utils/colors';
import AtLine from '../AtLine/AtLine';
import AtGroupTag from '../AtGroupTag/AtGroupTag';
import AtTypography from '../AtTypography/AtTypography';
import AtTag from '../AtTag/AtTag';
import { Skill, Talent } from '../../utils/redux/types/talents.type';
import AtRightClick from '../AtRightClick/AtRightClick';
import { boxShadow } from '../../utils/theme';
import { useAppSelector } from '../../utils/hooks/reduxHook';
import { getActiveTab } from '../../utils/redux/selectors/settings.selector';

const StyledCard = styled.div<{ fullHeight?: boolean }>`
  background-color: ${white};
  border: 1px solid ${grey5};
  border-radius: 10px;
  padding: 20px;
  transition: 0.3s;
  min-height: 120px;
  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}

  &:hover {
    box-shadow: ${boxShadow};
    transition: 0.3s;
    cursor: pointer;
    border-color: ${green};
  }
`;

const AtCard: React.FunctionComponent<AtCardProps> = (props: AtCardProps) => {
  const talent = new Talent(props.talent);
  const activeTab = useAppSelector((state) => getActiveTab(state));

  return (
    <StyledCard onClick={props.onClick} fullHeight={props.fullHeight}>
      <AtRightClick
        contextMenu={activeTab.content.rightClick({
          idTalent: talent.id,
          openShortlist: props.openShortlist,
          openAccepted: props.openAccepted,
        })}
      >
        <Box>
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
                <AtTypography color={grey3}>
                  Applied: {talent.applied}
                </AtTypography>
                <AtGroupTag icon={<ArrowRight2 size={10} />} />
              </Box>
              <AtTypography variant={'body1'} color={grey}>
                {talent.jobType}
              </AtTypography>
            </Box>
          </Box>

          <AtLine spacing={16} />

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
        </Box>
      </AtRightClick>
    </StyledCard>
  );
};

interface AtCardProps {
  talent?: Talent;
  fullHeight?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  openShortlist: () => void;
  openAccepted: () => void;
}

export default AtCard;
