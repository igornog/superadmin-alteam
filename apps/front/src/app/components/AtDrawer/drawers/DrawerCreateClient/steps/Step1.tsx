import { Box } from '@mui/material'
import { Gallery, AddCircle } from 'iconsax-react'
import React, { Dispatch } from 'react'
import styled from 'styled-components'
import { white, grey5, grey2, grey3 } from '../../../../../utils/colors'
import { Client } from '../../../../../utils/redux/types/clients.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../AtButton/AtButton'
import AtLine from '../../../../AtLine/AtLine'
import AtTextField from '../../../../AtTextField/AtTextField'
import AtTypography from '../../../../AtTypography/AtTypography'
import { StyledForm } from '../DrawerCreateClient'

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

const Step1: React.FunctionComponent<Step1Props> = (props: Step1Props) => {
  return (
    <StyledForm>
      <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
        <AtTypography variant={'h4'}>Company Information</AtTypography>
        <AtTypography variant={'caption'} color={grey2}>
          Fields with * are mandatory
        </AtTypography>
      </Box>

      <AtLine />

      <Box
        padding={'20px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'50px'}
      >
        <Box display={'flex'} gap={'15px'} alignItems={'center'}>
          <Box width={65} height={65}>
            <StyledPlaceholderLogo>
              <Gallery color={grey3} />
            </StyledPlaceholderLogo>
          </Box>

          <AtButton
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Outlined}
            endIcon={<AddCircle />}
            name={'Add Image'}
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

        <Box display={'flex'} gap={'30px'} flexDirection={'column'}>
          <AtTextField
            label={'Company Name'}
            required={true}
            placeholder={'Enter Name'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, companyName: e })
            }
          />

          <AtTextField
            label={'Phone Number'}
            required={true}
            placeholder={'Enter Phone'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, phoneNumber: e })
            }
          />

          <AtTextField
            label={'Company URL'}
            required={true}
            placeholder={'Enter Company URL'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, companyUrl: e })
            }
          />

          <AtTextField
            label={'Linkedin URL'}
            placeholder={'Enter Linkedin URL'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, linkedinUrl: e })
            }
          />

          <AtTextField
            label={'Industry'}
            placeholder={'Enter Industry'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, industry: e })
            }
          />
        </Box>
      </Box>
    </StyledForm>
  )
}

interface Step1Props {
  client: Client
  setClient: Dispatch<React.SetStateAction<Client>>
}

export default Step1
