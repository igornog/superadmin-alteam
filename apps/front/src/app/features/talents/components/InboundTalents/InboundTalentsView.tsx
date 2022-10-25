import { Grid } from '@mui/material';
import React from 'react';
import AtCard from '../../../../components/AtCard/AtCard';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook';
import { handleSelectTalent } from '../../../../utils/redux/actions/talents.action';
import { DisplayMode } from '../../../../utils/redux/types/settings.type';
import InboundTalentsTable from './InboundTalentsTable';

const InboundTalentsView: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const talents = useAppSelector((state) => state.talents);

  const handleClickCard = (id: number) => {
    dispatch(handleSelectTalent(id));
  };

  return (
    <Grid container={true} spacing={2.5} marginTop={0}>
      {settings.displayMode === DisplayMode.Grid ? (
        talents.listTalents.map((talent) => (
          <Grid item={true} xs={6} xl={4} key={talent.id} height={'100%'}>
            <AtCard
              talent={talent}
              onClick={() => handleClickCard(talent.id)}
            />
          </Grid>
        ))
      ) : settings.displayMode === DisplayMode.List ? (
        <Grid item={true} xs={12}>
          <InboundTalentsTable
            talents={talents.listTalents}
            onClick={handleClickCard}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default InboundTalentsView;
