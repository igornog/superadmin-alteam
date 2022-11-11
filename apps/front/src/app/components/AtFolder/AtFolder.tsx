import { Box, CircularProgress, Skeleton } from '@mui/material';
import { Folder } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import { black, grey3, grey5, white } from '../../utils/colors';
import AtTypography from '../AtTypography/AtTypography';

const StyledFolder = styled.div<{ minimize?: boolean }>`
  width: 100%;
  height: ${({ minimize }) => (minimize ? '60px' : '200px')};
  background: ${white};
  border-radius: 5px;
  border: 1px solid ${grey5};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ minimize }) => (minimize ? 'flex-start' : 'center')};
  gap: 20px;
  color: ${grey3};
  transition: color 0.3s;

  &:hover {
    transition: color 0.3s;
    cursor: pointer;
    color: ${black};
  }
`;

const AtFolder: React.FunctionComponent<AtFolderProps> = (
  props: AtFolderProps
) => {
  return (
    <StyledFolder onClick={props.onClick} minimize={props.minimize}>
      {props.loading ? (
        <Box
          display={'flex'}
          flexDirection={props.minimize ? 'row' : 'column'}
          alignItems={'center'}
          gap={props.minimize ? '5px' : '20px'}
        >
          <CircularProgress color={'secondary'} />
          <Skeleton animation="wave" width={'100%'} />
        </Box>
      ) : (
        <Box
          display={'flex'}
          flexDirection={props.minimize ? 'row' : 'column'}
          alignItems={'center'}
          gap={props.minimize ? '5px' : '20px'}
          paddingLeft={props.minimize ? '20px' : '0'}
        >
          {props.logo ?? <Folder size={props.minimize ? 20 : 40} />}
          <AtTypography variant={props.minimize ? 'body1' : 'h5'}>
            {props.name}
          </AtTypography>
        </Box>
      )}
    </StyledFolder>
  );
};

interface AtFolderProps {
  logo?: string;
  name?: string;
  loading?: boolean;
  minimize?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default AtFolder;
