import { Grid } from '@mui/material'
import React from 'react'
import { Client } from '../../../utils/redux/types/clients.type'
import AtClientCard from '../../AtCard/AtClientCard'

const ClientCard: React.FunctionComponent<ClientCardProps> = (
  props: ClientCardProps,
) => {
  return (
    <>
      {props.clients.map((client: Client) => (
        <Grid
          item={true}
          xs={4}
          xl={4}
          key={client.id}
          display={'flex'}
          flexDirection={'column'}
        >
          <AtClientCard
            client={client}
            onClick={() => client.id && props.openClient(client.id)}
            fullHeight={true}
          />
        </Grid>
      ))}
    </>
  )
}

interface ClientCardProps {
  clients: Client[]
  openClient: (id: number) => void
}

export default ClientCard
