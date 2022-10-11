import { Button, buttonClasses } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import AtTypography from './AtTypography';

const StyledButton = styled(Button)`
  &.${buttonClasses.root} {
    box-shadow: none;
    border-radius: 5px;

    & .${buttonClasses.endIcon} {
      margin-left: 5px;
    }
  }
`;

const AtButton: React.FunctionComponent<AtButtonProps> = (
  props: AtButtonProps
) => {
  return (
    <StyledButton
      variant="contained"
      color={props.color ?? 'primary'}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <AtTypography bold={true}>{props.name}</AtTypography>
    </StyledButton>
  );
};

interface AtButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
}

export default AtButton;
