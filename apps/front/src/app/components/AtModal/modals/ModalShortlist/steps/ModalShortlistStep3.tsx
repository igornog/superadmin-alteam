import { Box } from '@mui/material'
import React from 'react'
import { grey2 } from '../../../../../utils/colors'
import AtTextField from '../../../../AtTextField/AtTextField'
import AtTypography from '../../../../AtTypography/AtTypography'

const ModalShortlistStep3: React.FunctionComponent = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
      <AtTypography color={grey2}>
        Please write a message that will be send to the talent or skip this step
        if you don’t want to send any messages. You can also change the default
        text to something specific.
      </AtTypography>

      <AtTextField
        placeholder="Thank you for applying to YJC. We are pleased to inform you that we would like to have a chat with you. Please reply to this email when will be the best time for you to have a chat? Or book in the call in my calendly:&#10;Link: calendlyyoann.com"
        rows={10}
        multiline={true}
        value={''}
        label={'Shortlist Talent'}
      />
    </Box>
  )
}

export default ModalShortlistStep3
