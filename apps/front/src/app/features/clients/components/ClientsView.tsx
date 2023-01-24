import React, { useEffect, useState } from 'react'
import { clientsTabs } from '..'
import AtLayout from '../../../components/AtLayout/AtLayout'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handleClients } from '../../../utils/redux/actions/clients.action'
import {
  handleInitSettings,
  handleSettingsTab,
} from '../../../utils/redux/actions/settings.action'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'

const ClientsView: React.FunctionComponent = () => {
  const [settingsLoaded, setSettingsLoaded] = useState(false)

  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  const activeTab = useAppSelector((state) => getActiveTab(state))

  useEffect(() => {
    dispatch(
      handleInitSettings({
        tabs: clientsTabs,
      }),
    )

    setSettingsLoaded(true)
  }, [dispatch])

  useEffect(() => {
    if (activeTab) {
      dispatch(handleSettingsTab(activeTab.config))
    }
  }, [activeTab, dispatch, settings.tabs])

  useEffect(() => {
    if (activeTab?.status && settingsLoaded) {
      dispatch(
        handleClients({
          clientName: settings.filters.searchName,
          status: activeTab?.status,
        }),
      )
    }
  }, [settingsLoaded, activeTab?.status, dispatch, settings.filters.searchName])

  return (
    <AtLayout>
      {clientsTabs.filter((item) => item.title === activeTab?.title)[0]?.node}
    </AtLayout>
  )
}

export default ClientsView
