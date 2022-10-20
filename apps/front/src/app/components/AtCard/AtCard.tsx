import { Box } from '@mui/material';
import { ArrowRight2 } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import { green, grey3, grey5, white } from '../../utils/colors';
import AtLine from '../AtLine/AtLine';
import AtGroupTag from '../AtGroupTag/AtGroupTag';
import AtTypography from '../AtTypography/AtTypography';

const StyledCard = styled.div`
  background-color: ${white};
  border: 1px solid ${grey5};
  border-radius: 10px;
  padding: 20px;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    cursor: pointer;
    border-color: ${green};
  }
`;

const AtCard: React.FunctionComponent = () => {
  return (
    <StyledCard>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} gap={'5px'} flexDirection={'column'}>
          <Box display={'flex'} gap={'5px'} alignItems={'center'}>
            <AtTypography variant={'h5'}>Mega Devs</AtTypography>
            <AtGroupTag label="Group" />
          </Box>
          <AtTypography>Full Stack Development</AtTypography>
        </Box>

        <Box
          display={'flex'}
          gap={'5px'}
          flexDirection={'column'}
          alignItems={'flex-end'}
        >
          <Box display={'flex'} gap={'10px'} alignItems={'center'}>
            <AtTypography color={grey3}>Applied: 23.07.2022</AtTypography>
            <AtGroupTag icon={<ArrowRight2 size={10} />} />
          </Box>
          <AtTypography>Full Time</AtTypography>
        </Box>
      </Box>

      <AtLine spacing={16} />

      <Box display={'flex'}>
        <AtTypography color={grey3}>Applied to:&nbsp;</AtTypography>
        <AtTypography>
          Solo60... &gt; App, Ticknovate... &gt; Dev See all
        </AtTypography>
      </Box>

      <AtLine spacing={16} />

      <AtTypography color={grey3}>
        No skills been added by Mega Devs
      </AtTypography>
    </StyledCard>
  );
};

export default AtCard;
