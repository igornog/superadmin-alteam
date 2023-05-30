import { Box } from '@mui/material'
import { Edit } from 'iconsax-react'
import React, { useState } from 'react'
import AtFrame from '../../../AtFrame/AtFrame'
import AtTypography from '../../../AtTypography/AtTypography'
import AtLine from '../../../AtLine/AtLine'
import { grey2 } from '../../../../utils/colors'
import ModalScreeningQuestions from '../../../AtModal/modals/listings/ModalScreeningQuestions'

const ScreeningQuestions: React.FunctionComponent<QuestionsProps> = (
  props: QuestionsProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Screening questions'}
      icon={
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
      backgroundColor={'#FBFCFF'}
    >
      <Box display={'flex'} flexDirection={'column'}>
        {props.selectedListing.questions.length ?
          props.selectedListing.questions?.map(
            (question: string, index: number) => {
              return (
                <>
                  <Box display={'flex'} flexDirection={'column'} gap={'10px'} key={index}>
                    <AtTypography variant={'body1'}>
                      Question {index + 1}:
                    </AtTypography>
                    <AtTypography>{question}</AtTypography>
                  </Box>
                  {index < props.selectedListing.questions.length - 1 && (
                    <AtLine spacing={15} />
                  )}
                </>
              )
            },
          )
          :
          <AtTypography variant={'caption'} color={grey2}>No questions added.</AtTypography>}
      </Box>

      <ModalScreeningQuestions
        open={openModal}
        listing={props.selectedListing}
        onClose={() => setOpenModal(false)}
      />

    </AtFrame>
  )
}

interface QuestionsProps {
  selectedListing: any
}

export default ScreeningQuestions
