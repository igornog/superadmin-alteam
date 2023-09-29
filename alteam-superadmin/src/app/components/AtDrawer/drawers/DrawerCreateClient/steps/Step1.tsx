import { Box, Button } from '@mui/material'
import { Gallery, AddCircle } from 'iconsax-react'
import React, { Dispatch, useState } from 'react'
import styled from 'styled-components'
import { white, grey5, grey2, grey3, black } from '../../../../../utils/colors'
import { Client } from '../../../../../utils/redux/types/clients.type'
import {
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
          setImageUrl(result);
          props.setClient({ ...props.client, logo: file.name })
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
            Add image
            <AddCircle size={16} style={{
              marginLeft: '10px'
            }} />
            <input
              type="file"
              hidden
              onChange={(e: any) => handleFileChange(e)}
            />
          </Button>

          {selectedFile ?
            <div>
              <AtTypography variant={'caption'} color={grey2}>Selected file: {selectedFile.name}</AtTypography>
            </div>
            :
            <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
              <AtTypography variant={'caption'} color={grey2}>
                Files Allowed: JPG, PNG, SVG, WEBM
              </AtTypography>
              <AtTypography variant={'caption'} color={grey2}>
                Files Size: 2 mb maximum image size
              </AtTypography>
            </Box>}
        </Box>

        <Box display={'flex'} gap={'30px'} flexDirection={'column'}>
          <AtTextField
            label={'Company Name'}
            required
            placeholder={'Enter Name'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, companyName: e })
            }
          />

          <AtTextField
            label={'Phone Number'}
            required
            placeholder={'Enter Phone'}
            onValueChange={(e) =>
              props.setClient({ ...props.client, phoneNumber: e })
            }
          />

          <AtTextField
            label={'Company URL'}
            required
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
