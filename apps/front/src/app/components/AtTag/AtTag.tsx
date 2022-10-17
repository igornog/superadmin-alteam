import { Chip, chipClasses } from '@mui/material';
import React from 'react';
import { TrushSquare } from 'iconsax-react';
import { grey, red, white } from '../../utils/colors';
import styled from 'styled-components';

const StyledIcon = styled(TrushSquare)`
  &.${chipClasses.deleteIcon}:hover {
    color: ${red} !important;
  }
`;

const StyledChip = styled(Chip)`
  &.${chipClasses.filled}:hover {
    background-color: ${grey};
    color: ${white};
    cursor: pointer;

    & > svg {
      color: ${white};
    }
  }
`;

const AtTag: React.FunctionComponent<AtTagProps> = (props: AtTagProps) => {
  const handleClick = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <StyledChip
      variant="filled"
      label="Prototyping"
      deleteIcon={<StyledIcon />}
      onDelete={handleClick}
    />
  );
};

interface AtTagProps {
  label: string;
}

export default AtTag;
