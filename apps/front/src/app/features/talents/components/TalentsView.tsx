import { Grid } from '@mui/material';
import React from 'react';
import AtCard from '../../../components/AtCard/AtCard';
import AtLayout from '../../../components/AtLayout/AtLayout';
import TalentsViewSidePanel from './TalentsViewSidePanel';

const TalentsView: React.FunctionComponent = () => {
  return (
    <AtLayout
      title={'Inbound Talents'}
      sidePanel={<TalentsViewSidePanel />}
      sidePanelSize={'small'}
    >
      <Grid container={true} spacing={2.5} marginTop={2.5}>
        <Grid item={true}>
          <AtCard />
        </Grid>
        <Grid item={true}>
          <AtCard />
        </Grid>
        <Grid item={true}>
          <AtCard />
        </Grid>
        <Grid item={true}>
          <AtCard />
        </Grid>
        <Grid item={true}>
          <AtCard />
        </Grid>
      </Grid>
    </AtLayout>
  );
};

export default TalentsView;
