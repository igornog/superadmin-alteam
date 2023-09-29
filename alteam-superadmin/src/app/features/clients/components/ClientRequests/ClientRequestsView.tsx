import { Grid } from '@mui/material'
import React from 'react'
import ClientsSwitchMode from '../../../../components/app/clients/ClientsSwitchMode'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { Column } from '../../../../utils/redux/types/settings.type'
import { getActiveTab } from '../../../../utils/redux/selectors/settings.selector'
import { getAllClients } from '../../../../utils/redux/selectors/clients.selector'
import { Client } from '../../../../utils/redux/types/clients.type'

const ClientRequestsView: React.FunctionComponent = () => {
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const clients = useAppSelector((state) => getAllClients(state))
  const clientsByStatus = clients.filter((client: Client) => client.status === activeTab.status)

  return clientsByStatus.length === 0 ? (
    <AtNoResult sentence={`No ${activeTab.title}`}/>
  ) : (
    <Grid container spacing={2.5} marginTop={0} alignItems={'stretch'}>
      <Grid item xs={12}>
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