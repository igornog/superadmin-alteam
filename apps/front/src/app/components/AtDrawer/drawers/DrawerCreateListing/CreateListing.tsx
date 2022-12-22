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
import {
  ListingType,
  Difficulty,
  WorkType,
} from '../../../../utils/redux/types/listings.type'

import ProjectStep1 from './Project/steps/Step1'
import ProjectStep2 from './Project/steps/Step2'
import ProjectStep3 from './Project/steps/Step3'
import ProjectStep4 from './Project/steps/Step4'
import TeamStep1 from './Team/steps/Step1'
import TeamStep2 from './Team/steps/Step2'
import TeamStep3 from './Team/steps/Step3'
import TeamStep4 from './Team/steps/Step4'
import TeamStep5 from './Team/steps/Step5'
import { Availability } from '@yjcapp/app'

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
  const [formData, setFormData] = useState<FormFields>({
    nbIndividual: 0,
    workType: undefined,
    availability: undefined,
    hours: 0,
    projectLength: 0,
    startDate: '',
    rateType: undefined,
    rateFrom: 0,
    rateTo: 0,
    rateFixed: 0,
    difficulty: undefined,
    learning: '',
    jobDescription: '',
    screeningQuestion: undefined,
  })

  const handleCloseAll = () => {
    props.handleClose()
    props.handleBackToCreateListing()
  }

  return step === props.steps ? (
    <FinalStep handleClose={handleCloseAll} clientName={props.clientName} />
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
            onClick={() => props.handleBackToCreateListing()}
          />

          <AtTypography color={grey2}>Back to Create Listing</AtTypography>
        </Box>

        <AtTypography variant={'h3'}>Create {props.listingType}</AtTypography>

        <AtLine />

        <Grid container={true} justifyContent={'center'}>
          <Grid xs={10} display={'flex'} flexDirection={'column'} gap={'20px'}>
            <Box position={'relative'} zIndex={0}>
              <AtTabs
                tabs={
                  props.listingType === ListingType.Project
                    ? [
                        {
                          id: 0,
                          content: <ProjectStep1 />,
                        },
                        {
                          id: 1,
                          content: <ProjectStep2 />,
                        },
                        {
                          id: 2,
                          content: <ProjectStep3 />,
                        },
                        {
                          id: 3,
                          content: <ProjectStep4 />,
                        },
                      ]
                    : [
                        {
                          id: 0,
                          content: (
                            <TeamStep1
                              setFormData={setFormData}
                              formData={formData}
                            />
                          ),
                        },
                        {
                          id: 1,
                          content: <TeamStep2 formData={formData} />,
                        },
                        {
                          id: 2,
                          content: <TeamStep3 />,
                        },
                        {
                          id: 3,
                          content: <TeamStep4 />,
                        },
                        {
                          id: 4,
                          content: <TeamStep5 />,
                        },
                      ]
                }
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

export interface FormFields {
  nbIndividual?: number
  workType?: WorkType
  timeZone?: string
  availability?: Availability
  hours?: number
  projectLength?: number
  startDate?: string
  rateType?: string
  rateFrom?: number
  rateTo?: number
  rateFixed?: number
  difficulty?: Difficulty
  learning?: string
  jobDescription?: string
  screeningQuestion?: string[]
}

export default DrawerCreateListing
