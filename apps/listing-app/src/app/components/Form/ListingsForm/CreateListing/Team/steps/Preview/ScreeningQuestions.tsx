import { Box } from '@mui/material'
import React, { useState } from 'react'
import AtFrame from '../../../../../../Frame/Frame'
import AtLine from '../../../../../../Line/Line'
import AtTypography from '../../../../../../Typography/Typography'
import ModalScreeningQuestions from '../../../../../../../components/Modal/modals/ModalScreeningQuestions'
import { Edit } from 'iconsax-react'

const ScreeningQuestions: React.FunctionComponent<QuestionsProps> = (
  props: QuestionsProps,
) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <AtFrame
      title={'Screening questions'}
      backgroundColor={'#FBFCFF'}
      icon={props.isAuthenticated &&
        <AtTypography>
          <Edit size={16} />
          Edit
        </AtTypography>
      }
      onClick={() => setOpenModal(true)}
    >
      <Box display={'flex'} flexDirection={'column'}>
        {props.listing.questions?.map(
          (question: string, index: number) => {
            return (
              <>
                <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                  <AtTypography variant={'body1'}>
                    Question {index + 1}:
                  </AtTypography>
                  <AtTypography>{question}</AtTypography>
                </Box>
                {index < props.listing.questions.length - 1 && (
                  <AtLine spacing={15} />
                )}
              </>
            )
          },
        )}
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
}

export default ScreeningQuestions
