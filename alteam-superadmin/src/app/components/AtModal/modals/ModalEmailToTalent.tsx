import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useRef } from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTypography from '../../AtTypography/AtTypography'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtLine from '../../AtLine/AtLine'
import AtModal from '../AtModal'
import AtTextField from '../../AtTextField/AtTextField'
import { grey2 } from '../../../utils/colors'
import { useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import { capitalizeFirstLetter } from '../../../utils/helpers'
import AtTextFieldDropdown from '../../AtDropdown/AtTextFieldDropdown'

export type EmailTemplateData = {
  subject: string
  message: string
}

const ModalEmailToTalent: React.FunctionComponent<ModalEmailToTalentProps> = (
  props: ModalEmailToTalentProps,
) => {
  const form = useRef<any>(null)
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))

  const handleClose = () => {
    props.onClose?.()
    form.current.reset()
  }

  const submitForm = () => {
    props.onClose?.()
    form.current.reset()
  }

  return (
    <AtModal isOpen={props.isOpen} size={ModalSize.Small} onClose={handleClose}>
      <form ref={form} onSubmit={submitForm}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          padding={2.5}
          paddingBottom={0}
        >
          <AtTypography variant={'h4'}>
            Send Email to{' '}
            {selectedTalent.firstName &&
              capitalizeFirstLetter(selectedTalent.firstName)}{' '}
            {selectedTalent.lastName &&
              capitalizeFirstLetter(selectedTalent.lastName)}
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

        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={'30px'}
          padding={2.5}
        >
          <AtTypography color={grey2}>
            Please write your message to{' '}
            {selectedTalent.firstName &&
              capitalizeFirstLetter(selectedTalent.firstName)}{' '}
            here and we will automatically send it to the talent’s inbox. Please
            also select the email that you want it to be sent from.{' '}
          </AtTypography>

          <AtTextField
            placeholder={'Enter Subject'}
            label={'Subject'}
            name={'subject'}
            multiline
          />

          <AtTextField
            placeholder={'Enter Message'}
            label={'Email Body'}
            name={'message'}
            multiline
            rows={12}
          />

          <AtTextFieldDropdown
            fullWidth
            placeholder={'Sent From'}
            $listItems={[
              {
                id: 0,
                value: 'emailregistered@alteam.com',
                label: 'emailregistered@alteam.com',
              },
            ]}
            label={'Select Email To Be Sent From'}
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
              type="submit"
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={'Send Email'}
              endIcon={<TickSquare size={16} />}
            />
          </Box>
        </Box>
      </form>
    </AtModal>
  )
}

interface ModalEmailToTalentProps {
  isOpen: boolean
  onClose?: () => void
}

export default ModalEmailToTalent
