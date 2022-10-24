import { Chip, chipClasses } from '@mui/material';
import React from 'react';
import { TrushSquare } from 'iconsax-react';
import styled from 'styled-components';
import { white, red, grey } from '../../utils/colors';
import AtTypography from '../AtTypography/AtTypography';

const StyledIcon = styled(TrushSquare)`
  transition: 0.3s;

  &.${chipClasses.deleteIcon}:hover {
    transition: 0.3s;
    color: ${red} !important;
  }
`;

const StyledChip = styled(Chip)`
  color: ${grey};

  &.${chipClasses.filled}:hover {
    background-color: ${grey};
    color: ${white};
    cursor: pointer;
    transition: 0.3s;

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
      label={<AtTypography>{props.label}</AtTypography>}
      deleteIcon={props.delete ? <StyledIcon /> : undefined}
      onDelete={props.delete ? handleClick : undefined}
    />
  );
};

interface AtTagProps {
  label: string;
  delete?: boolean;
}

export default AtTag;
