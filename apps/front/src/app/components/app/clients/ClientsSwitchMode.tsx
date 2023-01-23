import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handleSelectClient } from '../../../utils/redux/actions/clients.action'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { DisplayMode, Column } from '../../../utils/redux/types/settings.type'
import { Tabs } from '../../../utils/types'
import DrawerClient from '../../AtDrawer/drawers/DrawerClient'
import DrawerClientListings from '../../AtDrawer/drawers/DrawerClientListings'
import ClientCard from './ClientCard'
import ClientsTable from './ClientsTable'

const ClientsSwitchMode: React.FunctionComponent<ClientsSwitchModeProps> = (
  props: ClientsSwitchModeProps,
) => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  const activeTab = useAppSelector((state) => getActiveTab(state))

  const clients = useAppSelector((state) => state.clients)
  const listClients = clients.listClients
  const [openDrawerClient, setOpenDrawerClient] = useState(false)
  const [openDrawerClientListing, setOpenDrawerClientListing] = useState(false)

  const handleClickClient = (id: number) => {
    dispatch(handleSelectClient(id))

    setOpenDrawerClientListing(activeTab.title === Tabs.ActiveClients)
    setOpenDrawerClient(activeTab.title !== Tabs.ActiveClients)
  }

  const handleClose = () => {
    dispatch(handleSelectClient(null))
    setOpenDrawerClient(false)
    setOpenDrawerClientListing(false)
  }

  return (
    <Grid container={true} spacing={2.5} alignItems={'stretch'}>
      {settings.displayMode === DisplayMode.Grid ? (
        <ClientCard clients={listClients} openClient={handleClickClient} />
      ) : (
        <Grid item={true} xs={12}>
          <ClientsTable
            clients={listClients}
            openClient={handleClickClient}
            tableColumns={props.tableColumns}
          />
        </Grid>
      )}

      <DrawerClient open={openDrawerClient} handleClose={handleClose} />

      <DrawerClientListings
        open={openDrawerClientListing}
        handleClose={handleClose}
      />
    </Grid>
  )
}

interface ClientsSwitchModeProps {
  tableColumns: Column[]
}

export default ClientsSwitchMode
