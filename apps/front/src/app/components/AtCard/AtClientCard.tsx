import { Box, Grid } from '@mui/material'
import { ArrowRight2 } from 'iconsax-react'
import React from 'react'
import { grey, grey2, grey3 } from '../../utils/colors'
import AtGroupTag from '../AtGroupTag/AtGroupTag'
import AtTypography from '../AtTypography/AtTypography'
import { StyledCard } from './AtTalentCard'
import { Client } from '../../utils/redux/types/clients.type'
import AtLine from '../AtLine/AtLine'
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton'
import ClientMenu from '../AtRightClick/ContextMenus/ClientMenu'
import AtRightClick from '../AtRightClick/AtRightClick'
import { useAppSelector } from '../../utils/hooks/reduxHook'
import { getActiveTab } from '../../utils/redux/selectors/settings.selector'
import ClientLogo from '../app/clients/ClientLogo'
import moment from 'moment'
import { stringMatch } from '../../utils/helpers'

const AtClientCard: React.FunctionComponent<AtClientCardProps> = (
  props: AtClientCardProps,
) => {
  const client = new Client(props.client)
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const settings = useAppSelector((state) => state.settings)

  return (
    <StyledCard onClick={props.onClick} fullHeight={props.fullHeight}>
      <AtRightClick
        disabled={activeTab.clientRightClick.length === 0}
        contextMenu={<ClientMenu />}
      >
        <Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            gap={'5px'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                <Box width={'28px'} height={'28px'}>
                  <ClientLogo logo={client.logo} />
                </Box>
                <AtTypography variant={'h5'}>
                  {stringMatch(
                    client.companyName,
                    settings.filters.searchName ?? '',
                  )}
                </AtTypography>
              </Box>
              <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                <AtTypography color={grey3}>
                  Received: {moment(client.received).format('DD.MM.YYYY')}
                </AtTypography>
                <AtGroupTag icon={<ArrowRight2 size={10} />} />
              </Box>
            </Box>

            <Box
              display={'flex'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <AtTypography variant={'body1'} color={grey}>
                {client.industry}
              </AtTypography>
              <AtTypography variant={'body1'} color={grey}>
                {/* {plurialize(client.listings?.length ?? 0, 'listing')} */}
              </AtTypography>
            </Box>
          </Box>

          <AtLine spacing={16} />

          <Box display={'flex'} gap={'10px'}>
            <AtTypography color={grey3}>Nobody assigned</AtTypography>

            <AtButton
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Text}
              name={'Assign now'}
              fontSize={'14px'}
            />
          </Box>

          <AtLine spacing={16} />

          <Box display={'flex'} flexDirection={'column'} gap={'6.5px'}>
            <Grid container={true}>
              <Grid item={true} xs={4}>
                <AtTypography color={grey2}>Email: </AtTypography>
              </Grid>
              <Grid item={true} xs={8}>
                <AtTypography color={grey}>{client.email}</AtTypography>
              </Grid>
            </Grid>

            <Grid container={true}>
              <Grid item={true} xs={4}>
                <AtTypography color={grey2}>Phone: </AtTypography>
              </Grid>
              <Grid item={true} xs={8}>
                <AtTypography color={grey}>{client.phoneNumber}</AtTypography>
              </Grid>
            </Grid>

            <Grid container={true}>
              <Grid item={true} xs={4}>
                <AtTypography color={grey2}>Company URL: </AtTypography>
              </Grid>
              <Grid item={true} xs={8}>
                <AtTypography color={grey}>{client.companyUrl}</AtTypography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </AtRightClick>
    </StyledCard>
  )
}

interface AtClientCardProps {
  client?: Client
  fullHeight?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default AtClientCard
