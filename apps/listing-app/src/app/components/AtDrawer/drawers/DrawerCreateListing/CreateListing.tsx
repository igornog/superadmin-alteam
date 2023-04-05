import { ArrowLeft2 } from 'iconsax-react'
import React, { useState } from 'react'
import { ListingType } from '@yjcapp/app'
import { white, grey2, black, grey4, grey5 } from '../../../../utils/colors'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../AtButton/AtButton'
import styled from 'styled-components'
import AtLine from '../../../AtLine/AtLine'
import AtTypography from '../../../AtTypography/AtTypography'
import { Box, Container } from '@mui/material'
import CreateProject from './Project/CreateProject'
import CreateTeam from './Team/CreateTeam'
import FinalStep from './FinalStep'
import { boxShadow } from '../../../../utils/theme'

export const StyledStepper = styled.div`
  position: sticky;
  bottom: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: fit-content;
  align-self: center;
`

export const StyledFormStepper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: ${white};
  border: 1px solid ${grey5};
  padding: 10px;
  box-shadow: ${boxShadow};
  gap: 10px;
`

export const StyledDot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? black : grey4)};
`

export const StyledForm = styled.div`
  background-color: ${white};
  border-radius: 5px;
`

const CreateListing: React.FC<CreateListingProps> = (
  props: CreateListingProps,
) => {
  const [step, setStep] = useState(0)

  return step === props.steps ? (
    <FinalStep />
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

        {props.listingType === ListingType.Project ? (
          <CreateProject step={step} setStep={setStep} client={props.clientName}/>
        ) : props.listingType === ListingType.Team ? (
          <CreateTeam step={step} setStep={setStep} client={props.clientName}/>
        ) : null}
      </Box>
    </Container>
  )
}

interface CreateListingProps {
  clientName: string
  steps?: number
  listingType: ListingType
  handleBackToCreateListing: () => void
}

export default CreateListing
