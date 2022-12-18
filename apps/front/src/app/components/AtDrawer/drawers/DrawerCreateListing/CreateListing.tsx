import { Box, Container, Grid } from '@mui/material'
import { ArrowLeft2, ArrowRight } from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { white, grey2, grey5, black, grey4 } from '../../../../utils/colors'
import { boxShadow } from '../../../../utils/theme'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTabs from '../../../AtTabs/AtTabs'
import AtTypography from '../../../AtTypography/AtTypography'
import FinalStep from './FinalStep'
import { ListingType } from '../../../../utils/redux/types/listings.type'
import { ProjectSteps, TeamSteps } from './FormSteps'

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

  width: fit-content;
  align-self: center;
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

const DrawerCreateListing: React.FunctionComponent<DrawerCreateListingProps> = (
  props: DrawerCreateListingProps,
) => {
  const [step, setStep] = useState(0)

  const handleCloseAll = () => {
    props.handleClose()
    props.handleBackToCreateListing()
  }

  return (
    step === props.steps ? (
      <FinalStep
        handleClose={handleCloseAll}
        clientName={props.clientName} />
    ) :
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
              onClick={() => props.handleBackToCreateListing()}
            />

            <AtTypography color={grey2}>
              Back to Create Listing
            </AtTypography>
          </Box>

          <AtTypography variant={'h3'}>Create {props.listingType}</AtTypography>

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
                  tabs={props.listingType === ListingType.Project ? ProjectSteps : TeamSteps}
                  step={step}
                />
              </Box>

              <Box display={'flex'} gap={'12px'} justifyContent={'center'}>
                {[...Array(props.steps).keys()].map((item: number) => (
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
                  <span style={{ color: black }}>{step + 1}</span>/{props.steps}
                </Box>
              </AtTypography>
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
  )
}

interface DrawerCreateListingProps {
  clientName: string
  steps: number
  listingType?: ListingType
  handleClose: () => void
  handleBackToCreateListing: () => void
}

export default DrawerCreateListing
