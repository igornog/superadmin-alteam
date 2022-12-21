import { FilterSquare } from 'iconsax-react'
import React, { useEffect } from 'react'
import { skillsFilters, availabilityFilters, talentsTabs } from '..'
import AtLayout from '../../../components/AtLayout/AtLayout'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import {
  handleInitSettings,
  handleSettingsTab,
} from '../../../utils/redux/actions/settings.action'
import { handleTalents } from '../../../utils/redux/actions/talents.action'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { Filter } from '../../../utils/redux/types/settings.type'
import TalentsViewFilters from './TalentsViewFilters'

const TalentsView: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  const activeTab = useAppSelector((state) => getActiveTab(state))

  useEffect(() => {
    dispatch(
      handleInitSettings({
        tabs: talentsTabs,
        filters: skillsFilters,
        jobTypes: availabilityFilters,
      }),
    )
  }, [dispatch])

  useEffect(() => {
    if (activeTab) {
      dispatch(handleSettingsTab(activeTab.config))
    }
  }, [activeTab, dispatch, settings.tabs])

  useEffect(() => {
    if (activeTab?.status) {
      dispatch(
        handleTalents({
          talentName: settings.filters.talentSearch,
          skills: settings.filters.skills
            ?.filter((skill) => skill.active)
            .map((item: Filter) => item.label),
          availability: settings.filters.jobTypes
            ?.filter((jobType) => jobType.active)
            .map((item: Filter) => item.label),
          status: activeTab?.status?.toLowerCase(),
        }),
      )
    }
  }, [
    activeTab?.status,
    dispatch,
    settings.filters.jobTypes,
    settings.filters.skills,
    settings.filters.talentSearch,
  ])

  return (
    <AtLayout
      sidePanel={<TalentsViewFilters />}
      sidePanelIcon={<FilterSquare size={20} />}
      sidePanelSize={'small'}
    >
      {talentsTabs.filter((item) => item.title === activeTab?.title)[0]?.node}
    </AtLayout>
  )
}

export default TalentsView
