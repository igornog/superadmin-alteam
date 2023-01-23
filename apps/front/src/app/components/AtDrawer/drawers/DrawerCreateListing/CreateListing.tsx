import { Box, Container } from '@mui/material'
import { ArrowLeft2 } from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ListingType } from '@yjcapp/app'
import { white, grey2 } from '../../../../utils/colors'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTypography from '../../../AtTypography/AtTypography'
import FinalStep from './FinalStep'

import CreateProject from './Project/CreateProject'
import CreateTeam from './Team/CreateTeam'

export const StyledForm = styled.div`
  background-color: ${white};
  border-radius: 5px;
`

const CreateListing: React.FunctionComponent<CreateListingProps> = (
  props: CreateListingProps,
) => {
  const [step, setStep] = useState(0)

  const handleCloseAll = () => {
    props.handleClose()

    setTimeout(() => {
      props.handleBackToCreateListing()
    }, 1500)
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

        {props.listingType === ListingType.Project ? (
          <CreateProject step={step} setStep={setStep} />
        ) : props.listingType === ListingType.Team ? (
          <CreateTeam step={step} setStep={setStep} />
        ) : null}
      </Box>
    </Container>
  )
}

interface CreateListingProps {
  clientName: string
  steps: number
  listingType?: ListingType
  handleClose: () => void
  handleBackToCreateListing: () => void
}

export default CreateListing
