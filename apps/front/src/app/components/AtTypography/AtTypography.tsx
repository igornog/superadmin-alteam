import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import React from 'react';
import styled from 'styled-components';

interface StyledTypographyProps {
  bold?: boolean;
  color?: string;
  fontSize?: string;
  display?: string;
}

const StyledTypography = styled(Typography)<StyledTypographyProps>`
  font-size: ${({ fontSize }) => fontSize && fontSize};
  font-weight: ${({ bold }) => (bold ? 'bold' : null)};
  color: ${({ color }) => (color ? color : null)};
  display: ${({ display }) => display ?? 'flex'};
  align-items: center;
  gap: 5px;
`;

const AtTypography: React.FunctionComponent<AtTypographyProps> = (
  props: AtTypographyProps
) => {
  return (
    <StyledTypography
      bold={props.bold}
      variant={props.variant ?? 'body2'}
      color={props.color}
      display={props.display}
      whiteSpace={props.whiteSpace ?? 'none'}
      {...props}
    >
      {props.children}
    </StyledTypography>
  );
};

interface AtTypographyProps {
  children: React.ReactNode;
  display?: string;
  bold?: boolean;
  variant?: Variant;
  color?: string;
  fontSize?: string;
  whiteSpace?: any;
}

export default AtTypography;
