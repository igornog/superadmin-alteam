import { Box } from '@mui/material'
import { ArrowLeft2, CloseCircle } from 'iconsax-react'
import React, { useState } from 'react'
import { black, grey2 } from '../../../../utils/colors'
import { ModalSize } from '../../../../utils/redux/types/settings.type'
import AtButton, {
  AtButtonKind,
  AtButtonVariant,
} from '../../../AtButton/AtButton'
import AtLine from '../../../AtLine/AtLine'
import AtSwitch from '../../../AtSwitch/AtSwitch'
import AtTypography from '../../../AtTypography/AtTypography'
import AtModal from '../../AtModal'
import CreateTalent from './CreateTalent/CreateTalent'
import InviteTalent from './InviteTalent/InviteTalent'

const ModalAddTalent: React.FunctionComponent<ModalAddTalentProps> = (
  props: ModalAddTalentProps,
) => {
  const [isInviting, setIsInviting] = useState(false)
  const [step, setStep] = useState(0)
  const [clearForm, setClearForm] = useState(false)

  const handleClose = () => {
    props.onClose?.()
    setIsInviting(false)
    setClearForm(true)
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
        {isInviting ? (
          <AtTypography variant={'h4'}>Invite Talent</AtTypography>
        ) : (
          <Box display={'flex'} gap={'15px'} alignItems={'center'}>
            {step > 0 && (
              <AtButton
                kind={AtButtonKind.Default}
                variant={AtButtonVariant.Contained}
                startIcon={<ArrowLeft2 />}
                onClick={() => setStep(step - 1)}
              />
            )}
            <AtTypography variant={'h4'}>Create Talent</AtTypography>
            <AtTypography color={grey2}>
              Step{' '}
              <Box>
                <span style={{ color: black }}>{step + 1}</span>/3
              </Box>
            </AtTypography>
          </Box>
        )}
        {step === 0 && (
          <Box display={'flex'} gap={'30px'} alignItems={'center'}>
            <AtSwitch
              label={
                <AtTypography variant="caption" color={grey2}>
                  {isInviting ? 'Create Talent' : 'Invite Talent'}
                </AtTypography>
              }
              onChange={() => setIsInviting(!isInviting)}
            />
            <AtButton
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Text}
              startIcon={<CloseCircle />}
              $iconSize={24}
              onClick={handleClose}
            />
          </Box>
        )}
      </Box>

      <AtLine spacingTop={20} />

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2.5}
        padding={2.5}
        overflow={'scroll'}
      >
        {isInviting ? (
          <InviteTalent handleClose={handleClose} />
        ) : (
          <CreateTalent
            clearForm={clearForm}
            setClearForm={setClearForm}
            handleClose={handleClose}
            step={step}
            setStep={setStep}
          />
        )}
      </Box>
    </AtModal>
  )
}

interface ModalAddTalentProps {
  isOpen: boolean
  onClose?: () => void
}

export default ModalAddTalent
