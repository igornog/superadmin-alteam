import { Grid } from '@mui/material'
import React from 'react'
import ClientsSwitchMode from '../../../../components/app/clients/ClientsSwitchMode'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { Column } from '../../../../utils/redux/types/settings.type'

const ClientRequestsView: React.FunctionComponent = () => {
  const clients = useAppSelector((state) => state.clients)

  return clients.listClients.length === 0 ? (
    <AtNoResult sentence={'No Client Requests'} />
  ) : (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      <Grid item={true} xs={12}>
        <ClientsSwitchMode
          tableColumns={[
            Column.Client,
            Column.Received,
            Column.Listings,
            Column.Assignees,
            Column.Email,
            Column.Phone,
            Column.CompanyUrl,
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default ClientRequestsView
