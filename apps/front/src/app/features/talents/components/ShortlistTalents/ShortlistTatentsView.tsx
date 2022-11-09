import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import TalentsSwitchMode from '../../../../components/app/talents/TalentsSwitchMode';
import AtLine from '../../../../components/AtLine/AtLine';
import AtSpace from '../../../../components/AtSpace/AtSpace';
import { useAppDispatch } from '../../../../utils/hooks/reduxHook';
import { handleLoadTree } from '../../../../utils/redux/actions/tree.action';
import ShortlistFolderListing from './ShortlistFolderListing';
import ShortlistTalentsHeader from './ShortlistTalentsHeader';

const ShortlistLatentsView: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleLoadTree());
  }, [dispatch]);

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <ShortlistFolderListing />

        <AtLine spacing={30} />

        <ShortlistTalentsHeader />

        <AtSpace direction={'vertical'} spacing={'20'} />

        <TalentsSwitchMode tableColumns={[]} />
      </Grid>
    </Grid>
  );
};

export default ShortlistLatentsView;
