import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, Refresh, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import { grey2 } from '../../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handlePatchClient } from '../../../utils/redux/actions/clients.action'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import ClientLogo from '../../app/clients/ClientLogo'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtLine from '../../AtLine/AtLine'
import AtSpace from '../../AtSpace/AtSpace'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import AtModal from '../AtModal'

const ModalEditClient: React.FunctionComponent<ModalEditClientProps> = (
  props: ModalEditClientProps,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  const [companyName, setCompanyName] = useState<string>()
  const dispatch = useAppDispatch()

  const handleSave = () => {
    dispatch(
      handlePatchClient({
        id: selectedClient.id,
        companyName,
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
        <AtTypography variant={'h4'}>Edit Name and Photo</AtTypography>
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
        <Box display={'flex'} gap={'15px'} alignItems={'center'}>
          <Box width={65} height={65}>
            <ClientLogo logo={selectedClient.logo} width={'65px'} />
          </Box>

          <AtButton
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Outlined}
            endIcon={<Refresh />}
            name={'Replace Image'}
          />

          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <AtTypography variant={'caption'} color={grey2}>
              Files Allowed: JPG, PNG, SVG, WEBM
            </AtTypography>
            <AtTypography variant={'caption'} color={grey2}>
              Files Size: 2 mb maximum image size
            </AtTypography>
          </Box>
        </Box>

        <AtSpace direction={'vertical'} spacing={'2'} />

        <AtTextField
          value={selectedClient.companyName}
          onValueChange={setCompanyName}
          label={'Company Name'}
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
            onClick={handleSave}
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

interface ModalEditClientProps {
  open: boolean
  onClose: () => void
}

export default ModalEditClient
