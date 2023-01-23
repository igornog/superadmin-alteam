import { Box } from '@mui/material'
import { Edit } from 'iconsax-react'
import React from 'react'
import AtFrame from '../../../AtFrame/AtFrame'
import AtLine from '../../../AtLine/AtLine'
import AtTypography from '../../../AtTypography/AtTypography'

const ScreeningQuestions: React.FunctionComponent<QuestionsProps> = (
  props: QuestionsProps,
) => {
  return (
    <AtFrame
      title={'Screening questions'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => undefined}
      backgroundColor={'#FBFCFF'}
    >
      <Box display={'flex'} flexDirection={'column'}>
        {props.selectedListing.screeningQuestion?.map(
          (question: string, index: number) => {
            return (
              <>
                <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                  <AtTypography variant={'body1'}>
                    Question {index + 1}:
                  </AtTypography>
                  <AtTypography>{question}</AtTypography>
                </Box>
                {index < props.selectedListing.screeningQuestion.length - 1 && (
                  <AtLine spacing={15} />
                )}
              </>
            )
          },
        )}
      </Box>
    </AtFrame>
  )
}

interface QuestionsProps {
  selectedListing: any
}

export default ScreeningQuestions
