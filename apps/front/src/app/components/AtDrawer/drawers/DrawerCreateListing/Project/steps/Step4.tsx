import { Box } from '@mui/material'
import React, { Dispatch } from 'react'
import AtLine from '../../../../../AtLine/AtLine'
import AtTextField from '../../../../../AtTextField/AtTextField'
import AtTypography from '../../../../../AtTypography/AtTypography'
import { StyledForm } from '../../DrawerCreateListing'
import { grey2 } from '../../../../../../utils/colors'
import { Listing } from '../../../../../../utils/redux/types/listings.type'

const ProjectStep4: React.FunctionComponent<Step4Props> = (
  props: Step4Props,
) => {
  const handleArrayValueChange = (
    index: number,
    setFunc: (val: any) => void,
    array: any[],
    newValue: string,
  ) => {
    const newArray = [...array]
    newArray[index] = newValue
    setFunc({
      ...props.project,
      questions: newArray,
    })
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <StyledForm>
        <Box padding={'20px'} display={'flex'} justifyContent={'space-between'}>
          <AtTypography variant={'h4'}>Screening Questions</AtTypography>
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
              label={'Screening Question 1'}
              placeholder={'Enter Screening Question'}
              maxLength={100}
              onValueChange={(e) =>
                handleArrayValueChange(
                  0,
                  props.setProject,
                  props.project.questions,
                  e,
                )
              }
            />

            <AtTextField
              label={'Screening Question 2'}
              placeholder={'Enter Screening Question'}
              maxLength={100}
              disabled={props.project.questions?.length < 1}
              onValueChange={(e) =>
                handleArrayValueChange(
                  1,
                  props.setProject,
                  props.project.questions,
                  e,
                )
              }
            />

            <AtTextField
              label={'Screening Question 3'}
              placeholder={'Enter Screening Question'}
              maxLength={100}
              disabled={props.project.questions?.length < 2}
              onValueChange={(e) =>
                handleArrayValueChange(
                  2,
                  props.setProject,
                  props.project.questions,
                  e,
                )
              }
            />
          </Box>
        </Box>
      </StyledForm>
    </Box>
  )
}

interface Step4Props {
  setProject: Dispatch<React.SetStateAction<Listing>>
  project: Listing
}

export default ProjectStep4
