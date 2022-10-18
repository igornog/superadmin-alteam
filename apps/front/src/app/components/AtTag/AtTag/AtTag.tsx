import { Chip, chipClasses } from '@mui/material';
import React from 'react';
import { TrushSquare } from 'iconsax-react';
import styled from 'styled-components';
import { white, red, grey } from '../../../utils/colors';

const StyledIcon = styled(TrushSquare)`
  transition: 0.3s;

  &.${chipClasses.deleteIcon}:hover {
    transition: 0.3s;
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
