import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
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

const ModalCompany: React.FunctionComponent<ModalCompanyProps> = (
  props: ModalCompanyProps,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const dispatch = useAppDispatch()

  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [companyUrl, setCompanyUrl] = useState<string>()
  const [industry, setIndustry] = useState<string>()
  const [linkedinUrl, setLinkedinUrl] = useState<string>()

  const handleSave = () => {
    dispatch(
      handlePatchClient({
        id: selectedClient.id,
        phoneNumber,
        companyUrl,
        industry,
        linkedinUrl,
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
        <AtTypography variant={'h4'}>Edit Company</AtTypography>
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
          label={'Phone Number'}
          onValueChange={setPhoneNumber}
          value={selectedClient.phoneNumber}
        />

        <AtTextField
          label={'Company URL'}
          value={selectedClient.companyUrl}
          onValueChange={setCompanyUrl}
        />

        <AtTextField
          label={'Industry'}
          value={selectedClient.industry}
          onValueChange={setIndustry}
        />

        <AtTextField
          label={'Linkedin URL'}
          value={selectedClient.linkedinUrl}
          onValueChange={setLinkedinUrl}
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

interface ModalCompanyProps {
  open: boolean
  onClose: () => void
}

export default ModalCompany
