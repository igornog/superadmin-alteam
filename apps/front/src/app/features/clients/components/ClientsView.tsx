import React, { useEffect } from 'react'
import { clients, talentsTabs } from '..'
import AtLayout from '../../../components/AtLayout/AtLayout'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handleClients } from '../../../utils/redux/actions/clients.action'
import {
  handleInitSettings,
  handleSettingsTab,
} from '../../../utils/redux/actions/settings.action'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'

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

    dispatch(handleClients(clients))
  }, [dispatch])

  useEffect(() => {
    if (activeTab) {
      dispatch(handleSettingsTab(activeTab.config))
    }
  }, [activeTab, dispatch, settings.tabs])

  return <AtLayout>{activeTab.content?.node}</AtLayout>
}

export default ClientsView
