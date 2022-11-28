import { Grid } from '@mui/material'
import React from 'react'
import { Column } from 'typeorm'
import ClientsSwitchMode from '../../../../components/app/clients/ClientsSwitchMode'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey3 } from '../../../../utils/colors'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'

const ClientRequestsView: React.FunctionComponent = () => {
  const clients = useAppSelector((state) => state.clients)

  return (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      {clients.listClients.length === 0 ? (
        <Grid item={true} xs={12}>
          <AtTypography variant={'h3'} color={grey3}>
            No Recent Candidates
          </AtTypography>
        </Grid>
      ) : (
        <Grid item={true} xs={12}>
          <ClientsSwitchMode
            tableColumns={[
              Column.Talent,
              Column.Applied,
              Column.Availability,
              Column.Status,
              Column.Skills,
            ]}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default ClientRequestsView
