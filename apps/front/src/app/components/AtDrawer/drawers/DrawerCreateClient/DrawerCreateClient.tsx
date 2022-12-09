import { Box, Container, Grid } from '@mui/material'
import { ArrowLeft2, ArrowRight, CloseSquare } from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { white, grey2, grey5, black, grey4 } from '../../../../utils/colors'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { getActiveTab } from '../../../../utils/redux/selectors/settings.selector'
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

  const handleClose = () => {
    props.handleClose()

    setTimeout(() => {
      setStep(0)
    }, 500)
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
                onClick={() => handleClose()}
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
                        content: <Step1 />,
                      },
                      {
                        id: 1,
                        content: <Step2 />,
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
                    onClick={() => setStep(step + 1)}
                    endIcon={<CloseSquare />}
                  />
                )}
                <AtButton
                  kind={AtButtonKind.Success}
                  variant={AtButtonVariant.Contained}
                  name={'Next Step'}
                  onClick={() => setStep(step + 1)}
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
