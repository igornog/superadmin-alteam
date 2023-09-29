import { FilterSquare } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import { statusFilters, listingTabs, clientsFilters, priceRangeFilters } from '..'
import AtListingLayout from '../../../components/AtLayout/AtListingLayout'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import {
  handleInitSettings,
  handleSettingsTab,
} from '../../../utils/redux/actions/settings.action'
import { handleInitListing } from '../../../utils/redux/actions/listing.action'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import ListingsViewFilters from './ListingsViewFilters'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'

const ListingView: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const [settingsLoaded, setSettingsLoaded] = useState(false)
  const settings = useAppSelector((state) => state.settings)
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  useEffect(() => {
    dispatch(
      handleInitSettings({
        tabs: listingTabs,
        clients: clientsFilters,
        listingStatus: statusFilters,
        priceRange: priceRangeFilters
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
    if (activeTab && settingsLoaded) {
      dispatch(
        handleInitListing({
          clientId: selectedClient?.id,
          listingName: settings.filters.searchName,
          sort: settings.sort
        }),
      )
    }
  }, [settingsLoaded, activeTab?.status, dispatch, settings.filters.searchName])

  return (
    <AtListingLayout
      sidePanel={<ListingsViewFilters />}
      sidePanelIcon={<FilterSquare size={20} />}
      sidePanelSize={'small'}
    >
      {listingTabs.filter((item) => item.status === activeTab?.status)[0]?.node}
    </AtListingLayout>
  )
}

export default ListingView
