import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import TalentsSwitchMode from '../../../../components/app/talents/TalentsSwitchMode';
import AtFolder from '../../../../components/AtFolder/AtFolder';
import AtLine from '../../../../components/AtLine/AtLine';
import AtSpace from '../../../../components/AtSpace/AtSpace';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook';
import { handleLoadTree } from '../../../../utils/redux/actions/tree.action';
import { StatusType } from '../../../../utils/redux/types/status.type';
import { TreeInterface } from '../../../../utils/redux/types/tree.type';
import ShortlistTalentsHeader from './ShortlistTalentsHeader';

const ShortlistLatentsView: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleLoadTree());
  }, [dispatch]);

  const tree = useAppSelector((state) => state.tree);

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Grid container={true} spacing={2.5}>
          {tree.status === StatusType.Succeeded ? (
            tree.data.children?.map((item: TreeInterface) => {
              return (
                <Grid item={true} xs={3}>
                  <AtFolder name={item.name} />
                </Grid>
              );
            })
          ) : (
            <Grid item={true} xs={3}>
              <AtFolder loading={true} />
            </Grid>
          )}
        </Grid>

        <AtLine spacing={30} />

        <ShortlistTalentsHeader />

        <AtSpace direction={'vertical'} spacing={'20'} />

        <TalentsSwitchMode tableColumns={[]} />
      </Grid>
    </Grid>
  );
};

export default ShortlistLatentsView;
