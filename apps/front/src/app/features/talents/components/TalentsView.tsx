import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { talents, talentsFilters, talentsJobType, talentsTabs } from '..';
import AtCard from '../../../components/AtCard/AtCard';
import AtLayout from '../../../components/AtLayout/AtLayout';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook';
import {
  handleInitSettings,
  handleSettingsTab,
} from '../../../utils/redux/actions/settings.action';
import {
  handleSelectTalent,
  handleTalents,
} from '../../../utils/redux/actions/talents.action';
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector';
import TalentsViewSidePanel from './TalentsViewSidePanel';

const TalentsView: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const activeTab = useAppSelector((state) => getActiveTab(state));

  useEffect(() => {
    dispatch(
      handleInitSettings({
        tabs: talentsTabs,
        filters: talentsFilters,
        jobTypes: talentsJobType,
      })
    );

    dispatch(handleTalents(talents));
  }, [dispatch]);

  useEffect(() => {
    if (activeTab) {
      dispatch(handleSettingsTab(activeTab));
    }
  }, [activeTab, dispatch, settings.tabs]);

  const handleClickCard = (id: number) => {
    dispatch(handleSelectTalent(id));
  };

  return (
    <AtLayout
      title={activeTab?.title}
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
