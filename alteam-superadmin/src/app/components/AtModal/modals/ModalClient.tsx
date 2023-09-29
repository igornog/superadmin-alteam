import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks/reduxHook'
import { handlePatchClient } from '../../../utils/redux/actions/clients.action'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtLine from '../../AtLine/AtLine'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import AtModal from '../AtModal'

const ModalClient: React.FunctionComponent<ModalClientProps> = (
  props: ModalClientProps,
) => {
  const dispatch = useAppDispatch()
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  const [email, setEmail] = useState<string>()
  const [fullName, setFullName] = useState<string>()
  const [position, setPosition] = useState<string>()

  const handleSaveGeneral = () => {
    dispatch(
      handlePatchClient({
        id: selectedClient.id,
        email,
        fullName,
        position,
      }),
    )
    props.onClose?.()
  }

  return (
    <AtModal isOpen={props.open} size={ModalSize.Small} onClose={props.onClose}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Edit Client</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTextField
          label={'Email'}
          value={selectedClient.email}
          onValueChange={setEmail}
        />

        <AtTextField
          label={'Full Name'}
          value={selectedClient.fullName}
          onValueChange={setFullName}
        />

        <AtTextField
          label={'Position'}
          value={selectedClient.position}
          onValueChange={setPosition}
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={handleSaveGeneral}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalClientProps {
  open: boolean
  onClose: () => void
}

export default ModalClient
