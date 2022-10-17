import React from 'react';
import styled, { css } from 'styled-components';
import { black, grey2, grey5, white } from '../../utils/colors';
import AtTypography from '../AtTypography/AtTypography';

const StyledTab = styled.div<{ active?: boolean }>`
  border: 1px solid ${grey5};
  ${({ active }) =>
    active
      ? css`
            background-color ${black};
            color: ${white};
        `
      : css`
            background-color ${grey5};
            
            &:hover {
                cursor: pointer;
                border-color: ${grey2};
            }
        `}

  border-radius: 5px;
  width: fit-content;
  padding: 10px 20px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const StyledBadge = styled.div<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? white : black)};
  color: ${({ active }) => (active ? black : white)};
  border-radius: 5px;
  padding: 3px 5px;
  font-size: 10px;
`;

const AtTab: React.FunctionComponent<AtTabProps> = (props: AtTabProps) => {
  return (
    <StyledTab active={props.active}>
      <AtTypography>{props.label}</AtTypography>
      {props.badge && (
        <StyledBadge active={props.active}>
          <AtTypography fontSize={'10px'}>{props.badge}</AtTypography>
        </StyledBadge>
      )}
    </StyledTab>
  );
};

interface AtTabProps {
  label: string;
  badge?: number;
  active?: boolean;
}

export default AtTab;
