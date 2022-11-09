import { Box, CircularProgress, Skeleton } from '@mui/material';
import { Folder } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import { black, grey3, grey5, white } from '../../utils/colors';
import AtTypography from '../AtTypography/AtTypography';

const StyledFolder = styled.div`
  width: 100%;
  height: 200px;
  background: ${white};
  border-radius: 5px;
  border: 1px solid ${grey5};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: ${grey3};
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    cursor: pointer;
    color: ${black};
  }
`;

const AtFolder: React.FunctionComponent<AtFolderProps> = (
  props: AtFolderProps
) => {
  return (
    <StyledFolder>
      {props.loading ? (
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={'20px'}
        >
          <CircularProgress color={'secondary'} />
          <Skeleton animation="wave" width={'100%'} />
        </Box>
      ) : (
        <>
          {props.logo ?? <Folder size={40} />}
          <AtTypography variant={'h5'}>{props.name}</AtTypography>
        </>
      )}
    </StyledFolder>
  );
};

interface AtFolderProps {
  logo?: string;
  name?: string;
  loading?: boolean;
}

export default AtFolder;
