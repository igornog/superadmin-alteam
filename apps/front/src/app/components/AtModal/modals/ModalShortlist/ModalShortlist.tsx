import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AtTypography from '../../../AtTypography/AtTypography'
import {
  ArrowLeft2,
  ArrowRight2,
  CloseCircle,
  CloseSquare,
  TickSquare,
} from 'iconsax-react'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../AtButton/AtButton'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook'
import { ModalSize } from '../../../../utils/redux/types/settings.type'
import AtModal from '../../AtModal'
import AtLine from '../../../AtLine/AtLine'
import { handleLoadGroups } from '../../../../utils/redux/actions/group.action'
import ModalShortlistStep1 from './steps/ModalShortlistStep1'
import { black, grey2 } from '../../../../utils/colors'
import ModalShortlistStep2 from './steps/ModalShortlistStep2'
import ModalShortlistStep3 from './steps/ModalShortlistStep3'
import AtTabs from '../../../AtTabs/AtTabs'
import { handlePatchTalent } from '../../../../utils/redux/actions/talents.action'
import { getActiveTalent } from '../../../../utils/redux/selectors/talents.selector'
import { ListingStatus } from '@yjcapp/app'

const ModalShortlist: React.FunctionComponent<ModalShortlistProps> = (
  props: ModalShortlistProps,
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
        status: ListingStatus.Shortlisted,
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
        <Box display={'flex'} gap={'15px'} alignItems={'center'}>
          {step > 0 && (
            <AtButton
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Contained}
              startIcon={<ArrowLeft2 />}
              onClick={() => setStep(step - 1)}
            />
          )}
          <AtTypography variant={'h4'}>Shortlist Talent</AtTypography>
          <AtTypography color={grey2}>
            Step{' '}
            <Box>
              <span style={{ color: black }}>{step + 1}</span>/3
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
              content: <ModalShortlistStep1 />,
            },
            {
              id: 1,
              content: <ModalShortlistStep2 />,
            },
            {
              id: 2,
              content: <ModalShortlistStep3 />,
            },
          ]}
          step={step}
        />

        <Box display={'flex'} justifyContent={'flex-end'} gap={'20px'}>
          <AtButton
            onClick={handleClose}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Text}
            name={'Cancel'}
            endIcon={<CloseSquare size={16} />}
          />

          <AtButton
            onClick={() => (step === 2 ? moveTalent() : setStep(step + 1))}
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Outlined}
            name={step === 2 ? 'Skip Step and Move' : 'Skip Step'}
            endIcon={<CloseSquare size={16} />}
          />
          <AtButton
            onClick={() => (step === 2 ? moveTalent() : setStep(step + 1))}
            kind={AtButtonKind.Success}
            variant={AtButtonVariant.Contained}
            name={step === 2 ? 'Send Message and Move' : 'Next Step'}
            endIcon={
              step === 2 ? <TickSquare size={16} /> : <ArrowRight2 size={16} />
            }
          />
        </Box>
      </Box>
    </AtModal>
  )
}

interface ModalShortlistProps {
  isOpen: boolean
  onClose: () => void
}

export default ModalShortlist
