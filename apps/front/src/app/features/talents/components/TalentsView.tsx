import { FilterSquare } from 'iconsax-react';
import React, { useEffect } from 'react';
import { talents, talentsFilters, talentsJobType, talentsTabs } from '..';
import AtLayout from '../../../components/AtLayout/AtLayout';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook';
import {
  handleInitSettings,
  handleSettingsTab,
} from '../../../utils/redux/actions/settings.action';
import { handleTalents } from '../../../utils/redux/actions/talents.action';
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector';
import InboundTalentsView from './InboundTalents/InboundTalentsView';
import TalentsViewFilters from './TalentsViewFilters';

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

  return (
    <AtLayout
      sidePanel={<TalentsViewFilters />}
      sidePanelIcon={<FilterSquare size={20} />}
      sidePanelSize={'small'}
    >
      <InboundTalentsView />
    </AtLayout>
  );
};

export default TalentsView;
