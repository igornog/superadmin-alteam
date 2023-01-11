import { Box } from '@mui/material'
import { AddCircle, CloseSquare, Edit, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import Client from '../../../features/clients/components/ClientViewProfile/Client'
import Company from '../../../features/clients/components/ClientViewProfile/Company'
import Notes from '../../../features/clients/components/ClientViewProfile/Notes'
import Request from '../../../features/clients/components/ClientViewProfile/Request'
import { grey3, white } from '../../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { Tabs } from '../../../utils/types'
import ClientLogo from '../../app/clients/ClientLogo'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtLine from '../../AtLine/AtLine'
import ModalEditClient from '../../AtModal/modals/ModalEditClient'
import AtTypography from '../../AtTypography/AtTypography'
import AtDrawer from '../AtDrawer'
import AtDrawerHeader from '../AtDrawerHeader'
import { ClientStatus } from '@yjcapp/app'
import { handlePathClientStatus } from '../../../utils/redux/actions/clients.action'

const DrawerClient: React.FunctionComponent<DrawerClientProps> = (
  props: DrawerClientProps,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const dispatch = useAppDispatch()

  const activeTab = useAppSelector((state) => getActiveTab(state))

  const [openEditModal, setOpenEditModal] = useState(false)

  const updateStatus = (status: ClientStatus) => {
    dispatch(handlePathClientStatus({ id: selectedClient.id, status }))
    props.handleClose()
  }

  return (
    <AtDrawer
      size={'50%'}
      backgroundColor={white}
      withBackdrop={true}
      open={props.open}
      handleClose={props.handleClose}
    >
      <AtDrawerHeader
        title={
          <Box
            display={'flex'}
            gap={'20px'}
            alignItems={'center'}
            height={'100%'}
          >
            <AtLine direction={'vertical'} />
            <Box display={'flex'} gap={'10px'}>
              <ClientLogo logo={selectedClient.logo} width={'40px'} />
              <AtTypography variant={'h4'}>
                {selectedClient?.companyName}
              </AtTypography>
            </Box>

            <AtButton
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Text}
              onClick={() => setOpenEditModal(true)}
              name={'Edit'}
              startIcon={<Edit size={16} />}
              fontSize={'14px'}
            />
          </Box>
        }
        sideTitle={
          <AtTypography color={grey3}>Applied: 23.07.2022</AtTypography>
        }
        handleClose={props.handleClose}
      />

      <Box
        display={'flex'}
        flexDirection={'column'}
        padding={'0 20px 25px 20px'}
        gap={'25px'}
      >
        <Company client={selectedClient} />

        <Request client={selectedClient} />

        <Client client={selectedClient} />

        <Notes />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          {activeTab.title === Tabs.ClientRequests ||
          activeTab.title === Tabs.InactiveClients ? (
            <AtButton
              onClick={() => updateStatus(ClientStatus.Declined)}
              kind={AtButtonKind.Danger}
              variant={AtButtonVariant.Contained}
              name={'Decline'}
              endIcon={<CloseSquare size={16} />}
            />
          ) : null}

          {activeTab.title === Tabs.ClientRequests ||
          activeTab.title === Tabs.DeclinedRequests ? (
            <AtButton
              onClick={() => updateStatus(ClientStatus.Inactive)}
              kind={AtButtonKind.Default}
              variant={
                activeTab.title === Tabs.DeclinedRequests
                  ? AtButtonVariant.Contained
                  : AtButtonVariant.Outlined
              }
              name={'Move to Inactive'}
              endIcon={
                activeTab.title === Tabs.DeclinedRequests ? (
                  <AddCircle size={16} />
                ) : (
                  <TickSquare size={16} />
                )
              }
            />
          ) : null}

          {activeTab.title === Tabs.ClientRequests ||
          activeTab.title === Tabs.InactiveClients ||
          activeTab.title === Tabs.DeclinedRequests ? (
            <AtButton
              onClick={() => updateStatus(ClientStatus.Active)}
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={'Move to Active'}
              endIcon={<TickSquare size={16} />}
            />
          ) : null}
        </Box>
      </Box>

      <ModalEditClient
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </AtDrawer>
  )
}

interface DrawerClientProps {
  open: boolean
  handleClose: () => void
}

export default DrawerClient
