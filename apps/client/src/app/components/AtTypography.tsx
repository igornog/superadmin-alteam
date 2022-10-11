import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import React from 'react';
import styled from 'styled-components';

interface StyledTypographyProps {
  bold?: boolean;
  color?: string;
}

const StyledTypography = styled(Typography)<StyledTypographyProps>`
  font-weight: ${({ bold }) => (bold ? 'bold' : null)};
  color: ${({ color }) => (color ? color : null)};
`;

const AtTypography: React.FunctionComponent<AtTypographyProps> = (
  props: AtTypographyProps
) => {
  return (
    <StyledTypography
      bold={props.bold}
      variant={props.variant ?? 'body2'}
      color={props.color}
      {...props}
    >
      {props.children}
    </StyledTypography>
  );
};

interface AtTypographyProps {
  children: any;
  bold?: true;
  variant?: Variant;
  color?: string;
}

export default AtTypography;
