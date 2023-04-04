import { Box } from '@mui/material'
import { ArrowRight2, CloseSquare } from 'iconsax-react'
import React, { useState } from 'react'
import { grey2 } from '../../../../../utils/colors'
import { isValidEmail } from '../../../../../utils/emails'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../../AtButton/AtButton'
import AtTextField from '../../../../AtTextField/AtTextField'
import AtTypography from '../../../../AtTypography/AtTypography'

const InviteTalent: React.FunctionComponent<InviteTalentProps> = (
  props: InviteTalentProps,
) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
      <AtTypography color={grey2}>
        Please fill the forms above and press the button to invite talent. We
        will send the link to the talent and as soon as the talent will apply
        the profile will appear on the inbound talent link
      </AtTypography>

      <AtTextField
        placeholder={'Enter First Name'}
        value={firstName}
        required={true}
        label={'First Name'}
        onValueChange={setFirstName}
      />

      <AtTextField
        placeholder={'Enter Last Name'}
        value={lastName}
        required={true}
        label={'Last Name'}
        onValueChange={setLastName}
      />

      <AtTextField
        placeholder={'Enter Email'}
        value={email}
        required={true}
        label={'Email'}
        onValueChange={setEmail}
      />

      <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
        <AtButton
          onClick={props.handleClose}
          kind={AtButtonKind.Danger}
          variant={AtButtonVariant.Text}
          name={'Cancel'}
          endIcon={<CloseSquare size={16} />}
        />

        <AtButton
          kind={AtButtonKind.Success}
          variant={AtButtonVariant.Contained}
          name={'Invite'}
          disabled={
            !(
              isValidEmail(email) &&
              firstName.length > 0 &&
              lastName.length > 0
            )
          }
          endIcon={<ArrowRight2 size={16} />}
        />
      </Box>
    </Box>
  )
}

interface InviteTalentProps {
  handleClose: () => void
}

export default InviteTalent
