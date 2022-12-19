import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTypography from '../../AtTypography/AtTypography'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtLine from '../../AtLine/AtLine'
import AtModal from '../AtModal'
import AtTextField from '../../AtTextField/AtTextField'
import { grey2, grey3, grey5 } from '../../../utils/colors'
import { useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import AtDropdown from '../../AtDropdown/AtDropdown'
import styled from 'styled-components'

const StyledDropdown = styled(AtDropdown)`
  justify-content: space-between;
  width: 100%;
  border-color: ${grey5};
  color: ${grey3};
`

const ModalEmailToTalent: React.FunctionComponent<ModalEmailToTalentProps> = (
  props: ModalEmailToTalentProps,
) => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))

  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  const handleClose = () => {
    props.onClose?.()
    setSubject('')
    setMessage('')
    setEmail('')
  }

  const handleSendEmail = () => {
    console.log('Send email to ' + email)
  }

  return (
    <AtModal isOpen={props.isOpen} size={ModalSize.Small} onClose={handleClose}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>
          Send Email to {selectedTalent.firstName} {selectedTalent.lastName}
        </AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={handleClose}
        />
      </Box>

      <AtLine spacingTop={20} />

      <Box display={'flex'} flexDirection={'column'} gap={'30px'} padding={2.5}>
        <AtTypography color={grey2}>
          Please write your message to Bob Snailson here and we will
          automatically send it to the talent’s inbox. Please also select the
          email that you want it to be sent from.{' '}
        </AtTypography>

        <AtTextField
          placeholder={'Enter Subject'}
          label={'Subject'}
          value={subject}
        />

        <AtTextField
          placeholder={'Enter Message'}
          label={'Shortlist Talent'}
          value={message}
          multiline={true}
          rows={12}
        />

        <StyledDropdown
          $listItems={[
            { id: 0, value: 'None', label: 'None' },
            { id: 1, value: 'None', label: 'None' },
          ]}
          label={'Select Email'}
          padding={'25px 20px'}
          placeholder={'Select Your Email'}
          align={'bottom-right'}
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Outlined}
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={handleSendEmail}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Send Email'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalEmailToTalentProps {
  isOpen: boolean
  onClose?: () => void
}

export default ModalEmailToTalent
