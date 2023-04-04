import { Box, Container, Grid } from '@mui/material'
import { ArrowLeft2, ArrowRight, CloseSquare } from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { white, grey2, grey5, black, grey4 } from '../../../../utils/colors'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook'
import { handleCreateClient } from '../../../../utils/redux/actions/clients.action'
import { getActiveTab } from '../../../../utils/redux/selectors/settings.selector'
import { Client } from '../../../../utils/redux/types/clients.type'
import { boxShadow } from '../../../../utils/theme'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTabs from '../../../AtTabs/AtTabs'
import AtTypography from '../../../AtTypography/AtTypography'
import AtDrawer from '../../AtDrawer'
import FinalStep from './steps/FinalStep'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import { ClientStatus } from '@yjcapp/app'

export const StyledForm = styled.div`
  background-color: ${white};
  border-radius: 5px;
`

const StyledStepper = styled.div`
  position: sticky;
  bottom: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledFormStepper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: ${white};
  border: 1px solid ${grey5};
  padding: 10px;
  box-shadow: ${boxShadow};
  gap: 10px;
`

const StyledDot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? black : grey4)};
`

const DrawerCreateClient: React.FunctionComponent<DrawerCreateClientProps> = (
  props: DrawerCreateClientProps,
) => {
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const [step, setStep] = useState(0)
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

  const handleClose = () => {
    setClient(defaultClient)
    props.handleClose()

    setTimeout(() => {
      setStep(0)
    }, 500)
  }

  const createClient = () => {
    if (step === 1) {
      if (
        client.projectType &&
        client.deliveryType &&
        client.teamRequest &&
        client.request &&
        client.email &&
        client.fullName &&
        client.position
      ) {
        dispatch(
          handleCreateClient({ ...client, status: ClientStatus.Request }),
        )
      } else {
        dispatch(handleCreateClient(client))
      }
    }

    setStep(step + 1)
  }

  return (
    <AtDrawer
      size={'100%'}
      backgroundColor={'#F7F8FE'}
      withBackdrop={true}
      open={props.open}
      handleClose={handleClose}
    >
      {step === 2 ? (
        <FinalStep handleClose={handleClose} />
      ) : (
        <Container>
          <Box
            paddingY={'30px'}
            display={'flex'}
            flexDirection={'column'}
            gap={'30px'}
          >
            <Box display={'flex'} gap={'5px'}>
              <AtButton
                variant={AtButtonVariant.Contained}
                startIcon={<ArrowLeft2 />}
                kind={AtButtonKind.Default}
                onClick={handleClose}
              />

              <AtTypography color={grey2}>
                Back to {activeTab.title}
              </AtTypography>
            </Box>

            <AtTypography variant={'h3'}>Create Client</AtTypography>

            <AtLine />

            <Grid container={true} justifyContent={'center'}>
              <Grid
                xs={10}
                display={'flex'}
                flexDirection={'column'}
                gap={'20px'}
              >
                <Box position={'relative'} zIndex={0}>
                  <AtTabs
                    tabs={[
                      {
                        id: 0,
                        content: (
                          <Step1 client={client} setClient={setClient} />
                        ),
                      },
                      {
                        id: 1,
                        content: (
                          <Step2 client={client} setClient={setClient} />
                        ),
                      },
                    ]}
                    step={step}
                  />
                </Box>

                <Box display={'flex'} gap={'12px'} justifyContent={'center'}>
                  {[...Array(2).keys()].map((item: number) => (
                    <StyledDot isActive={step === item} />
                  ))}
                </Box>
              </Grid>
            </Grid>

            <StyledStepper>
              <StyledFormStepper>
                {step > 0 && (
                  <AtButton
                    variant={AtButtonVariant.Contained}
                    startIcon={<ArrowLeft2 />}
                    kind={AtButtonKind.Default}
                    onClick={() => setStep(step - 1)}
                  />
                )}
                <AtTypography color={grey2}>
                  Step{' '}
                  <Box>
                    <span style={{ color: black }}>{step + 1}</span>/2
                  </Box>
                </AtTypography>

                {step > 0 && (
                  <AtButton
                    kind={AtButtonKind.Default}
                    variant={AtButtonVariant.Outlined}
                    name={'Skip Step'}
                    onClick={createClient}
                    endIcon={<CloseSquare />}
                  />
                )}

                <AtButton
                  kind={AtButtonKind.Success}
                  disabled={
                    !client.companyName ||
                    !client.phoneNumber ||
                    !client.companyUrl
                  }
                  variant={AtButtonVariant.Contained}
                  name={'Next Step'}
                  onClick={createClient}
                  endIcon={<ArrowRight />}
                />
              </StyledFormStepper>
            </StyledStepper>
          </Box>
        </Container>
      )}
    </AtDrawer>
  )
}

interface DrawerCreateClientProps {
  open: boolean
  handleClose: () => void
}

export default DrawerCreateClient
