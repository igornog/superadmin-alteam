import React from 'react';
import styled from 'styled-components';
import { grey5, white } from '../../../utils/colors';

const StyledFilters = styled.div`
  background-color: ${white};
  border-left: 1px solid ${grey5};
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  width: 235px;
`;

const TalentsViewSidePanel: React.FunctionComponent = () => {
  return (
    <StyledFilters>

    </StyledFilters>
  );
};

export default TalentsViewSidePanel;
