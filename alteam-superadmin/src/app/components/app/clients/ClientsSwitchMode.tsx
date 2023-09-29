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
import { getAllClients } from '../../../utils/redux/selectors/clients.selector'
import { Client } from '../../../utils/redux/types/clients.type'

const ClientsSwitchMode: React.FunctionComponent<ClientsSwitchModeProps> = (
  props: ClientsSwitchModeProps,
) => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const clients = useAppSelector((state) => getAllClients(state))
  const clientsByStatus = clients.filter((client: Client) => client.status === activeTab.status)
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
    <Grid container spacing={2.5} alignItems={'stretch'}>
      {settings.displayMode === DisplayMode.Grid ? (
        <ClientCard clients={clientsByStatus} openClient={handleClickClient} />
      ) : (
        <Grid item xs={12}>
          <ClientsTable
            clients={clientsByStatus}
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
