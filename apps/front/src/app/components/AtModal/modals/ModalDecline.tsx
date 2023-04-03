import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React from 'react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../AtButton/AtButton'
import AtTextField from '../../AtTextField/AtTextField'
import AtTypography from '../../AtTypography/AtTypography'
import { ModalSize } from '../../../utils/redux/types/settings.type'
import AtLine from '../../AtLine/AtLine'
import AtModal from '../AtModal'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handlePatchTalent } from '../../../utils/redux/actions/talents.action'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import { ListingStatus } from '@yjcapp/app'

const ModalDecline: React.FunctionComponent<ModalDeclineProps> = (
  props: ModalDeclineProps,
) => {
  const dispatch = useAppDispatch()
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))

  const moveTalent = () => {
    dispatch(
      handlePatchTalent({
        id: selectedTalent.id,
        status: ListingStatus.Declined,
      }),
    )
    props.onClose?.()
  }

  return (
    <AtModal
      isOpen={props.isOpen}
      size={ModalSize.Small}
      onClose={props.onClose}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <AtTypography variant={'h4'}>Decline Talent</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTextField
          multiline={true}
          rows={12}
          value={''}
          label={'Decline Talent'}
          defaultValue={
            'Thank you a lot for your time and effort to apply to YJCollective. We have an overwhelming amount of applicants and unfortunately, we won’t be progressing with you further. \n \nPlease check for new opportunities and don’t hesitate to apply. \n \nWe wish you all the best of luck with your search.'
          }
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={props.onClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            startIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={moveTalent}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Decline'}
            startIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalDeclineProps {
  isOpen: boolean
  onClose?: () => void
}

export default ModalDecline
