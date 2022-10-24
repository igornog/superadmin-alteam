import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { talents, talentsFilters, talentsJobType, talentsTabs } from '..';
import AtCard from '../../../components/AtCard/AtCard';
import AtLayout from '../../../components/AtLayout/AtLayout';
import { useAppDispatch } from '../../../utils/hooks/reduxHook';
import { handleSettings } from '../../../utils/redux/actions/settings.action';
import {
  handleSelectTalent,
  handleTalents,
} from '../../../utils/redux/actions/talents.action';
import TalentsViewSidePanel from './TalentsViewSidePanel';

const TalentsView: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      handleSettings({
        tabs: talentsTabs,
        filters: talentsFilters,
        jobTypes: talentsJobType,
      })
    );

    dispatch(handleTalents(talents));
  }, [dispatch]);

  const handleClickCard = (id: number) => {
    dispatch(handleSelectTalent(id));
  };

  return (
    <AtLayout
      title={'Inbound Talents'}
      sidePanel={<TalentsViewSidePanel />}
      sidePanelSize={'small'}
    >
      <Grid container={true} spacing={2.5} marginTop={0}>
        {talents.map((talent) => (
          <Grid item={true} xs={6} key={talent.id} height={'100%'}>
            <AtCard
              talent={talent}
              onClick={() => handleClickCard(talent.id)}
            />
          </Grid>
        ))}
      </Grid>
    </AtLayout>
  );
};

export default TalentsView;
