import { Grid } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handleSelectClient } from '../../../utils/redux/actions/clients.action'
import { handleDrawer } from '../../../utils/redux/actions/settings.action'
import {
  SideDrawerVariant,
  DisplayMode,
  Column,
} from '../../../utils/redux/types/settings.type'
import ClientCard from './ClientCard'
import ClientsTable from './ClientsTable'

const ClientsSwitchMode: React.FunctionComponent<ClientsSwitchModeProps> = (
  props: ClientsSwitchModeProps,
) => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  const clients = useAppSelector((state) => state.clients)
  const listClients = clients.listClients

  const handleClickClient = (id: number) => {
    dispatch(handleSelectClient(id))
    dispatch(handleDrawer(SideDrawerVariant.Client))
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
    </Grid>
  )
}

interface ClientsSwitchModeProps {
  tableColumns: Column[]
}

export default ClientsSwitchMode
