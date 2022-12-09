import { Box } from '@mui/material'
import { CloseSquare, TickSquare } from 'iconsax-react'
import React, { useState } from 'react'
import TalentAbout from '../../../features/talents/components/TalentViewProfile/TalentAbout'
import TalentAttachments from '../../../features/talents/components/TalentViewProfile/TalentAttachments'
import TalentGeneral from '../../../features/talents/components/TalentViewProfile/TalentGeneral'
import TalentLinks from '../../../features/talents/components/TalentViewProfile/TalentLinks'
import TalentListings from '../../../features/talents/components/TalentViewProfile/TalentListings'
import TalentNotes from '../../../features/talents/components/TalentViewProfile/TalentNotes'
import TalentSkills from '../../../features/talents/components/TalentViewProfile/TalentSkills'
import { grey3, white } from '../../../utils/colors'
import { useAppSelector } from '../../../utils/hooks/reduxHook'
import { getActiveTab } from '../../../utils/redux/selectors/settings.selector'
import { getActiveTalent } from '../../../utils/redux/selectors/talents.selector'
import { Tabs } from '../../../utils/types'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../AtButton/AtButton'
import ModalAccepted from '../../AtModal/modals/ModalAccepted/ModalAccepted'
import ModalDecline from '../../AtModal/modals/ModalDecline'
import ModalShortlist from '../../AtModal/modals/ModalShortlist/ModalShortlist'
import AtTypography from '../../AtTypography/AtTypography'
import AtDrawer from '../AtDrawer'
import AtDrawerHeader from '../AtDrawerHeader'

const DrawerTalent: React.FunctionComponent<DrawerTalentProps> = (
  props: DrawerTalentProps,
) => {
  const selectedTalent = useAppSelector((state) => getActiveTalent(state))
  const activeTab = useAppSelector((state) => getActiveTab(state))

  const [openModalShortlist, setOpenModalShortlist] = useState(false)
  const [openModalAccepted, setOpenModalAccepted] = useState(false)
  const [openModalDecline, setOpenModalDecline] = useState(false)

  return (
    <AtDrawer
      size={'50%'}
      backgroundColor={white}
      withBackdrop={true}
      open={props.open}
      handleClose={props.handleClose}
    >
      <AtDrawerHeader
        title={
          <AtTypography variant={'h4'}>{selectedTalent?.fullName}</AtTypography>
        }
        sideTitle={
          <AtTypography color={grey3}>Applied: 23.07.2022</AtTypography>
        }
        handleClose={props.handleClose}
      />

      <Box
        display={'flex'}
        flexDirection={'column'}
        padding={'0 20px 25px 20px'}
        gap={'25px'}
      >
        {activeTab.title === Tabs.ShortlistTalent ||
          (activeTab.title === Tabs.AcceptedTalent && <TalentListings />)}

        <TalentSkills talent={selectedTalent} />

        <TalentGeneral talent={selectedTalent} />

        <TalentAbout />

        <TalentLinks talent={selectedTalent} />

        <TalentAttachments />

        <TalentNotes />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          <AtButton
            onClick={() => setOpenModalDecline(true)}
            kind={AtButtonKind.Danger}
            variant={AtButtonVariant.Contained}
            name={'Decline'}
            endIcon={<CloseSquare size={16} />}
          />
          {activeTab.title === Tabs.ShortlistTalent ? (
            <AtButton
              onClick={() => setOpenModalAccepted(true)}
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={'Accept'}
              endIcon={<TickSquare size={16} />}
            />
          ) : (
            <AtButton
              onClick={() => setOpenModalShortlist(true)}
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={'Shortlist'}
              endIcon={<TickSquare size={16} />}
            />
          )}
        </Box>
      </Box>

      <ModalShortlist
        isOpen={openModalShortlist}
        onClose={() => setOpenModalShortlist(false)}
      />

      <ModalAccepted
        isOpen={openModalAccepted}
        onClose={() => setOpenModalAccepted(false)}
      />

      <ModalDecline
        isOpen={openModalDecline}
        onClose={() => setOpenModalDecline(false)}
      />
    </AtDrawer>
  )
}

interface DrawerTalentProps {
  open: boolean
  handleClose: () => void
}

export default DrawerTalent
