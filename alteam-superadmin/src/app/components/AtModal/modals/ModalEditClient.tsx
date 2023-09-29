import { Box, Button } from '@mui/material'
import { CloseCircle, CloseSquare, Gallery, Refresh, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import { black, grey2, grey3, grey5, white } from '../../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handlePatchClient } from '../../../utils/redux/actions/clients.action'
import { getActiveClient } from '../../../utils/redux/selectors/clients.selector'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtLine from '../../AtLine/AtLine'
import AtSpace from '../../AtSpace/AtSpace'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import AtModal from '../AtModal'
import styled from 'styled-components'

const StyledPlaceholderLogo = styled.div`
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${white};
  border: 1px solid ${grey5};
  border-radius: 5px;
`

const ModalEditClient: React.FunctionComponent<ModalEditClientProps> = (
  props: ModalEditClientProps,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))

  const [companyName, setCompanyName] = useState<string>()
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setImageUrl(result)
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSave = () => {
    dispatch(
      handlePatchClient({
        id: selectedClient.id,
        logo: selectedFile?.name,
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
          {/* <Box width={65} height={65}>
            <ClientLogo logo={selectedClient.logo} width={'65px'} />
          </Box> */}

          <Box width={65} height={65}>
            {!imageUrl ?
              <StyledPlaceholderLogo>
                <Gallery color={grey3} />
              </StyledPlaceholderLogo> :
              imageUrl &&
              <img
                src={imageUrl}
                alt="Client Image"
                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '5px' }} />}
          </Box>

          {/* <AtButton
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Outlined}
            endIcon={<Refresh />}
            name={'Replace Image'}
          /> */}

          <Button
            variant={AtButtonVariant.Outlined}
            component="label"
            sx={{
              color: black,
              borderColor: black,
              '&:hover': {
                color: grey2,
                border: `1px solid ${grey2}`,
                backgroundColor: 'transparent',

              }
            }}
          >
            Replace Image
            <Refresh size={16} style={{
              marginLeft: '10px'
            }} />
            <input
              type="file"
              hidden
              onChange={(e: any) => handleFileChange(e)}
            />
          </Button>

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
