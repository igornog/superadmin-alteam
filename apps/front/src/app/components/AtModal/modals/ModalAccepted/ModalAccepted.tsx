import { Box } from '@mui/material'
import { CloseCircle, CloseSquare, ArrowRight2 } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import { grey2, black } from '../../../../utils/colors'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook'
import { handleLoadGroups } from '../../../../utils/redux/actions/group.action'
import { ModalSize } from '../../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtTabs from '../../../AtTabs/AtTabs'
import AtTypography from '../../../AtTypography/AtTypography'
import AtModal from '../../AtModal'
import ModalAcceptedStep1 from './steps/ModalAcceptedStep1'
import ModalAcceptedStep2 from './steps/ModalAcceptedStep2'
import { handlePatchTalent } from '../../../../utils/redux/actions/talents.action'
import { getActiveTalent } from '../../../../utils/redux/selectors/talents.selector'
import { ListingStatus } from '@yjcapp/app'

const ModalAccepted: React.FunctionComponent<ModalAcceptedProps> = (
  props: ModalAcceptedProps,
) => {
  const dispatch = useAppDispatch()
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (props.isOpen) {
      dispatch(handleLoadGroups({}))
    }
  }, [dispatch, props.isOpen])

  const moveTalent = () => {
    dispatch(
      handlePatchTalent({
        id: selectedTalent.id,
        status: ListingStatus.Accepted,
      }),
    )
    props.onClose?.()
  }

  const handleClose = () => {
    props.onClose()
    setStep(0)
  }

  return (
    <AtModal
      isOpen={props.isOpen}
      size={ModalSize.Small}
      onClose={handleClose}
      minWidth={step === 2 ? '50vw' : '25vw'}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={2.5}
        paddingBottom={0}
      >
        <Box display={'flex'} gap={'15px'}>
          <AtTypography variant={'h4'}>Move to Accepted</AtTypography>
          <AtTypography color={grey2}>
            Step{' '}
            <Box>
              <span style={{ color: black }}>{step + 1}</span>/2
            </Box>
          </AtTypography>
        </Box>
        <AtButton
          kind={AtButtonKind.Default}
          variant={AtButtonVariant.Text}
          startIcon={<CloseCircle />}
          $iconSize={24}
          onClick={handleClose}
        />
      </Box>

      <AtLine spacingTop={20} />

      <Box display={'flex'} flexDirection={'column'} gap={2.5} padding={2.5}>
        <AtTabs
          tabs={[
            {
              id: 0,
              content: <ModalAcceptedStep1 />,
            },
            {
              id: 1,
              content: <ModalAcceptedStep2 />,
            },
          ]}
          step={step}
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={'20px'}>
          <AtButton
            onClick={step === 0 ? handleClose : () => setStep(step - 1)}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />

          <AtButton
            onClick={() => (step === 1 ? moveTalent() : setStep(step + 1))}
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Outlined}
            name={'Skip Step'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={() => (step === 1 ? moveTalent() : setStep(step + 1))}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={step === 1 ? 'Move' : 'Next Step'}
            endIcon={<ArrowRight2 size={16} />}
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalAcceptedProps {
  isOpen: boolean
  onClose: () => void
}

export default ModalAccepted
