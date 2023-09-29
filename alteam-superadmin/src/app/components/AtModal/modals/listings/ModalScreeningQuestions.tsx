import { Box } from '@mui/material'
import { ClientListing } from '@yjcapp/app'
import { useAppDispatch } from '../../../../utils/hooks/reduxHook'
import { handleUpdateListing } from '../../../../utils/redux/actions/listing.action'
import { ModalSize } from '../../../../utils/redux/types/settings.type'
import { CloseCircle, CloseSquare, TickSquare } from 'iconsax-react'
import React, { useRef } from 'react'
import AtButton, { AtButtonKind, AtButtonVariant } from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTextField from '../../../AtTextField/AtTextField'
import AtTypography from '../../../AtTypography/AtTypography'
import AtModal from '../../AtModal'


const ModalScreeningQuestions: React.FunctionComponent<
  ModalScreeningQuestionsProps
> = (props: ModalScreeningQuestionsProps) => {
  const dispatch = useAppDispatch()
  const questionOne = useRef<string>(props.listing.questions[0])
  const questionTwo = useRef<string>(props.listing.questions[1])
  const questionThree = useRef<string>(props.listing.questions[2])

  const handleSave = () => {
    dispatch(handleUpdateListing({ id: props.listing?.id, questions: [questionOne.current, questionTwo.current, questionThree.current] }))
    props.onClose?.()
  }

  return (
    <AtModal
      isOpen={props.open}
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
        <AtTypography variant={'h4'}>Edit Screening Questions</AtTypography>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={props.onClose}
        />
      </Box>

      <AtLine spacingTop={20} spacingBottom={5} />

      <Box display={'flex'} flexDirection={'column'} gap={3.5} padding={2.5}>

        <AtTextField
          label={'Screening Question 1'}
          placeholder={'Enter Screening Question'}
          maxLength={100}
          value={props.listing.questions[0]}
          onValueChange={(e) => questionOne.current = e}
        />

        <AtTextField
          label={'Screening Question 2'}
          placeholder={'Enter Screening Question'}
          maxLength={100}
          value={props.listing.questions[1]}
          onValueChange={(e) => questionTwo.current = e}
        />

        <AtTextField
          label={'Screening Question 3'}
          placeholder={'Enter Screening Question'}
          maxLength={100}
          value={props.listing.questions[2]}
          onValueChange={(e) => questionThree.current = e}
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
            onClick={handleSave}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={'Save Changes'}
            endIcon={<TickSquare size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalScreeningQuestionsProps {
  listing: ClientListing;
  open: boolean
  onClose?: () => void
}

export default ModalScreeningQuestions
