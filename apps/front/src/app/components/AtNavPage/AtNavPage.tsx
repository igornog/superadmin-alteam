import React from 'react';
import styled from 'styled-components';
import AtTab from '../AtTab/AtTab';

const StyledNavPage = styled.div`
  background-color: #0f152708;
  display: flex;
  gap: 10px;
  width: fit-content;
  padding: 5px;
  border-radius: 10px;
`;

const AtNavPage: React.FunctionComponent<AtNavPageProps> = (
  props: AtNavPageProps
) => {
  return (
    <StyledNavPage>
      {props.pages.map((page, index) => (
        <AtTab label={page.label} badge={page.badge} />
      ))}
    </StyledNavPage>
  );
};

interface AtNavPageProps {
  pages: {
    label: string;
    badge?: number;
    action?: string;
  }[];
}

export default AtNavPage;
