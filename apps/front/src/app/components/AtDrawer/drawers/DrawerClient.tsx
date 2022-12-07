import { Box } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import Client from '../../../features/clients/components/ClientViewProfile/Client'
import Company from '../../../features/clients/components/ClientViewProfile/Company'
import Notes from '../../../features/clients/components/ClientViewProfile/Notes'
import Request from '../../../features/clients/components/ClientViewProfile/Request'
import { grey3, white } from '../../../utils/colors'
import { useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
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

const DrawerClient: React.FunctionComponent<DrawerClientProps> = (
  props: DrawerClientProps,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  const [openEditModal, setOpenEditModal] = useState(false)

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
              <AtTypography variant={'h4'}>{selectedClient?.name}</AtTypography>
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

        <Request />

        <Client client={selectedClient} />

        <Notes />
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
