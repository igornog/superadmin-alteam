import React, { Dispatch } from 'react'
import AtLine from '../../../../../Line/Line'
import AtTextField from '../../../../../TextField/TextField'
import AtTypography from '../../../../../Typography/Typography'
import { StyledForm } from '../../CreateListingStart'
import { grey2 } from '../../../../../../utils/colors'
import { Box } from '@mui/material'
import styled from 'styled-components'
import { Listing } from '../../../../../../utils/redux/types/listings.type'

const StyledCharCounter = styled.div`
  position: absolute;
  bottom: 20px;
  padding: 10px;
  color: ${grey2};
`

const ProjectStep2: React.FC<Step2Props> = (props: Step2Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box
          padding={'20px'}
          display={'flex'}
          justifyContent={'space-between'}
          flexDirection={props.isSmallScreen ? 'column' : 'row'}
        >
          <AtTypography
            variant={'h4'}
            fontSize={props.isSmallScreen ? '1.125rem' : '1.625rem'}
          >
            Job Description
          </AtTypography>
          <AtTypography variant={'caption'} color={grey2}>
            Fields with * are mandatory
          </AtTypography>
        </Box>
        <AtLine />
        <Box
          padding={'20px'}
          position={'relative'}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'flex-end'}
          gap={'50px'}
        >
          <AtTextField
            onValueChange={(e) =>
              props.setProject({ ...props.project, jobDescription: e })
            }
            maxLength={500}
            multiline={true}
            rows={6}
            required
            label={'Job Description'}
            placeholder={'Enter Job Description'}
          />
          <StyledCharCounter>
            <AtTypography variant={'caption'} color={grey2}>
              {props.project.jobDescription?.length ?? 0}/500
            </AtTypography>
          </StyledCharCounter>
        </Box>
      </StyledForm>
    </Box>
  )
}

interface Step2Props {
  setProject: Dispatch<React.SetStateAction<Listing>>
  project: Listing
  isSmallScreen?: boolean
}

export default ProjectStep2
