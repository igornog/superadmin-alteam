import React, { useEffect } from 'react'
import { clients, tabsClientsContent, talentsTabs } from '..'
import AtLayout from '../../../components/AtLayout/AtLayout'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handleClients } from '../../../utils/redux/actions/clients.action'
import {
  handleInitSettings,
  handleSettingsTab,
} from '../../../utils/redux/actions/settings.action'
import { handleTalents } from '../../../utils/redux/actions/talents.action'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { talents } from '../../talents'

const ClientsView: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  const activeTab = useAppSelector((state) => getActiveTab(state))

  useEffect(() => {
    dispatch(
      handleInitSettings({
        tabs: talentsTabs,
      }),
    )

    dispatch(handleTalents(talents))
    dispatch(handleClients(clients))
  }, [dispatch])

  useEffect(() => {
    if (activeTab) {
      dispatch(handleSettingsTab(activeTab.config))
    }
  }, [activeTab, dispatch, settings.tabs])

  return (
    <AtLayout>
      {
        tabsClientsContent?.[
          activeTab?.title as keyof typeof tabsClientsContent
        ]?.node
      }
    </AtLayout>
  )
}

export default ClientsView
