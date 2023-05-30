import { Box } from '@mui/material'
import React, { Dispatch } from 'react'
import { Listing } from '../../../../../../../utils/redux/types/listings.type'
import AtTypography from '../../../../../../Typography/Typography'
import { StyledForm } from '../../../CreateListingStart'
import AtLine from '../../../../../../Line/Line'
import GeneralInformation from './GeneralInformation'
import JobDescription from './JobDescription'
import ScreeningQuestions from './ScreeningQuestions'
import Skills from './Skills'

const Preview: React.FC<PreviewProps> = (props: PreviewProps) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box
          padding={'20px'}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={props.isSmallScreen ? 'column' : 'row'}
        >
          <AtTypography
            variant={'h4'}
            fontSize={props.isSmallScreen ? '1.125rem' : '1.625rem'}
          >
            Listing Preview
          </AtTypography>
        </Box>

        <AtLine />

        <Box
          padding={'20px'}
          display={'flex'}
          flexDirection={'column'}
          gap={'50px'}
        >

          <Box display={'flex'} flexDirection={'column'} gap={'25px'}>
            <GeneralInformation
              listing={props.project}
            />

            <JobDescription
              listing={props.project}
            />

            <Skills
              listing={props.project}
            />

            <ScreeningQuestions
              listing={props.project}
            />
          </Box>
        </Box>
      </StyledForm>
    </Box>
  )
}

interface PreviewProps {
  setProject: Dispatch<React.SetStateAction<Listing>>
  project: Listing
  isSmallScreen?: boolean
}

export default Preview
