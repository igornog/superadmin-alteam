import { Grid } from '@mui/material';
import React from 'react';
import AtCard from '../../../../components/AtCard/AtCard';
import AtTypography from '../../../../components/AtTypography/AtTypography';
import { grey3 } from '../../../../utils/colors';
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
  const listTalent = talents.listTalents;

  const handleClickCard = (id: number) => {
    dispatch(handleSelectTalent(id));
  };

  return (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      {listTalent.length === 0 ? (
        <Grid item={true} xs={12}>
          <AtTypography variant={'h3'} color={grey3}>
            No Recent Candidates
          </AtTypography>
        </Grid>
      ) : settings.displayMode === DisplayMode.Grid ? (
        listTalent.map((talent) => (
          <Grid
            item={true}
            xs={6}
            xl={4}
            key={talent.id}
            display={'flex'}
            flexDirection={'column'}
          >
            <AtCard
              talent={talent}
              onClick={() => handleClickCard(talent.id)}
              fullHeight={true}
            />
          </Grid>
        ))
      ) : settings.displayMode === DisplayMode.List ? (
        <Grid item={true} xs={12}>
          <InboundTalentsTable talents={listTalent} onClick={handleClickCard} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default InboundTalentsView;
