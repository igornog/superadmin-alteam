import { Grid } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { grey5, white } from '../../../utils/colors';

const StyledFilters = styled.div`
  background-color: ${white};
  border-left: 1px solid ${grey5};
  height: 100%;
`;

const TalentsViewSidePanel: React.FunctionComponent = () => {
  return (
    <Grid item={true} xs={2}>
      <StyledFilters></StyledFilters>
    </Grid>
  );
};

export default TalentsViewSidePanel;
