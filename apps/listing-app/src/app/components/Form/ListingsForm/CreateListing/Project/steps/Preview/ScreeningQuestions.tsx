import { Box } from '@mui/material'
import React, { useState } from 'react'
import AtFrame from '../../../../../../Frame/Frame'
import AtLine from '../../../../../../Line/Line'
import AtTypography from '../../../../../../Typography/Typography'
import { Edit } from 'iconsax-react'
import ModalScreeningQuestions from '../../../../../../Modal/modals/ModalScreeningQuestions'
import { grey2 } from '../../../../../../../utils/colors'

const ScreeningQuestions: React.FunctionComponent<QuestionsProps> = (
  props: QuestionsProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Screening questions'}
      backgroundColor={'#FBFCFF'}
      padding={props.isSmallScreen ? '0px' : '20px'}
      icon={props.isAuthenticated &&
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <Box display={'flex'} flexDirection={'column'}>
        {props.listing.questions.length ?
          props.listing.questions?.map(
            (question: string, index: number) => {
              return (
                  <Box key={index} display={'flex'} flexDirection={'column'} gap={'10px'}>
                    <AtTypography variant={'body1'}>
                      Question {index + 1}:
                    </AtTypography>
                    <AtTypography>
                      {question}
                    </AtTypography>
                    {index < props.listing.questions.length - 1 && (
                    <AtLine spacing={15} />
                  )}
                  </Box>
              )
            },
          ) :
            <AtTypography variant={'caption'} color={grey2}>No questions added.</AtTypography>
          }
      </Box>

      <ModalScreeningQuestions
        open={openModal}
        listing={props.listing}
        onClose={() => setOpenModal(false)}
      />

    </AtFrame>
  )
}

interface QuestionsProps {
  listing: any
  isAuthenticated?: boolean
  isSmallScreen?: boolean
}

export default ScreeningQuestions
