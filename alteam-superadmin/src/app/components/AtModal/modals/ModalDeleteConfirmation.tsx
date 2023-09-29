import { Box } from '@mui/material'
import { CloseCircle } from 'iconsax-react'
import React from 'react'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtLine from '../../AtLine/AtLine'
import AtTypography from '../../AtTypography/AtTypography'
import AtModal from '../AtModal'
import { handleClients, handleDeleteClient } from '../../../utils/redux/actions/clients.action'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'

const ModalDeleteConfirmation: React.FunctionComponent<ModalDeleteConfirmationProps> = (
  props: ModalDeleteConfirmationProps,
) => {
  const dispatch = useAppDispatch()
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  const deleteClient = async (id: number) => {
    await dispatch(handleDeleteClient(id))
    await dispatch(handleClients({}))
    props.handleClose()
    props.onClose?.()
  }

  return (
    <AtModal
      isOpen={props.isOpen}
      size={ModalSize.Small}
      onClose={props.onClose}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>{`Are you sure you want to delete this?`}</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>
      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={5}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          gap={2.5}
          paddingX={10}
        >
          <AtButton
            onClick={() => deleteClient(selectedClient.id as number)}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Contained}
            name={'Yes, I want to delete this permanently'}
          />
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Secondary}
            variant={AtButtonVariant.Contained}
            name={'Cancel'}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalDeleteConfirmationProps {
  isOpen: boolean
  onClose?: () => void
  handleClose: () => void
}

export default ModalDeleteConfirmation

