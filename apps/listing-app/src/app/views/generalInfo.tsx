import { useState } from 'react';
import styled from 'styled-components';
import { Box, Container } from '@mui/material';
import { ArrowRight2 } from 'iconsax-react';
import { ClientStatus } from '@yjcapp/app';
import { Client } from '../utils/redux/types/clients.type';
import { useAppDispatch } from '../utils/hooks/reduxHook';
import { handleCreateClient } from '../utils/redux/actions/clients.action';
import AtButton, { AtButtonKind, AtButtonVariant } from '../components/AtButton/AtButton';
import AtTextFieldDropdown from '../components/AtDropdown/AtTextFieldDropdown';
import AtLine from '../components/AtLine/AtLine';
import AtTextField from '../components/AtTextField/AtTextField';
import AtTypography from '../components/AtTypography/AtTypography';
import { white, grey2 } from '../utils/colors';

export const StyledForm = styled.div`
  background-color: ${white};
  margin: 30px 10vw;
  border-radius: 5px;
`

const GeneralInfoForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const defaultClient = {
    companyName: '',
    phoneNumber: '',
    companyUrl: '',
    linkedinUrl: '',
    industry: '',
    projectType: undefined,
    deliveryType: undefined,
    teamRequest: undefined,
    request: '',
    email: '',
    fullName: '',
    position: '',
    status: ClientStatus.Request,
  }

  const [client, setClient] = useState<Client>(defaultClient)

  const createClient = () => {
    dispatch(handleCreateClient(client))
    window.location.href = '/create-my-listing'
  }

  return (
    <Container>
      <Box padding={'30px 0'}>
        <AtTypography variant={'h3'}>Start by telling us who you are</AtTypography>
      </Box>
      <AtLine />
      <StyledForm>
        <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
          <AtTypography variant={'h4'}>General Information</AtTypography>
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
          <Box display={'flex'} gap={'30px'} flexDirection={'column'}>
            <AtTextField
              label={'Full Name'}
              required
              placeholder={'Enter Full Name'}
              onValueChange={(e) =>
                setClient({ ...client, fullName: e })
              }
              maxLength={30}
            />

            <AtTextField
              label={'Email Address'}
              required
              placeholder={'Enter Email Address'}
              onValueChange={(e) =>
                setClient({ ...client, email: e })
              }
              maxLength={30}
            />

            <AtTextField
              maxWidth={99}
              placeholder={'Enter Phone Number'}
              required
              countryCode
              onValueChange={(e) =>
                setClient({ ...client, phoneNumber: e })
              }
              label={'Phone Number'}
            />

            <AtTextField
              label={'Company Name'}
              required
              placeholder={'Enter Company Name'}
              onValueChange={(e) =>
                setClient({ ...client, companyName: e })
              }
              maxLength={30}
            />

            <AtTextField
              label={'Position'}
              // type={AtTextFieldType.Number}
              required
              placeholder={'Enter Position'}
              onValueChange={(e) =>
                setClient({ ...client, position: e })
              }
              maxLength={30}
            />

            <AtTextField
              label={'LinkedIn URL'}
              placeholder={'Enter LinkedIn URL'}
              onValueChange={(e) =>
                setClient({ ...client, linkedinUrl: e })
              }
            />

            <AtTextFieldDropdown
              fullWidth
              placeholder={'Select Industry'}
              searchable={false}
              label={'Industry'}
              $listItems={[
                {
                  id: 0,
                  label: 'Software Engineering'
                },
                {
                  id: 1,
                  label: 'Data'
                },
                {
                  id: 2,
                  label: 'Marketing'
                },
                {
                  id: 3,
                  label: 'Web 3.0'
                },
                {
                  id: 4,
                  label: 'Finance, Legal & Compliance'
                }
              ]}
              onValueChange={(e) =>
                setClient({ ...client, industry: e })
              }
            />

          </Box>

          <Box display={'flex'} justifyContent={'flex-end'}>
            <AtButton
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={'Next Step'}
              endIcon={<ArrowRight2 />}
              onClick={createClient}
            />
          </Box>
        </Box>
      </StyledForm>
    </Container>
  )
}

export default GeneralInfoForm