import { Chip, chipClasses } from '@mui/material';
import React from 'react';
import { TrushSquare } from 'iconsax-react';
import styled, { css } from 'styled-components';
import { white, red, grey, black } from '../../utils/colors';
import AtTypography from '../AtTypography/AtTypography';
import { convertHexToRGBA } from '../../utils/helpers';

const StyledIcon = styled(TrushSquare)`
  transition: 0.3s;

  &.${chipClasses.deleteIcon}:hover {
    transition: 0.3s;
    color: ${red} !important;
  }
`;

const StyledChip = styled(Chip)<{ clickable?: boolean; variant: string }>`
  color: ${grey};
  background-color: ${({ variant }) =>
    variant === 'filled' && convertHexToRGBA(black, 0.05)};

  ${(clickable) =>
    !clickable &&
    css`
      &.${chipClasses.filled}:hover {
        background-color: ${grey};
        color: ${white};
        cursor: pointer;
        transition: 0.3s;

        & > svg {
          color: ${white};
        }
      }
    `}
`;

const AtTag: React.FunctionComponent<AtTagProps> = (props: AtTagProps) => {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <StyledChip
      {...props}
      variant={props.variant ?? 'filled'}
      clickable={props.hover}
      label={<AtTypography>{props.label}</AtTypography>}
      deleteIcon={props.delete ? <StyledIcon /> : undefined}
      onDelete={props.delete ? handleDelete : undefined}
    />
  );
};

interface AtTagProps {
  label: string;
  delete?: boolean;
  hover?: boolean;
  variant?: 'filled' | 'outlined';
}

export default AtTag;
