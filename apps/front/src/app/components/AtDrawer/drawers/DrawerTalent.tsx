import { Box } from '@mui/material'
import { CloseSquare, TickSquare } from 'iconsax-react'
import moment from 'moment'
import React, { useState } from 'react'
import { ListingStatus } from '@yjcapp/app'
import TalentAbout from '../../../features/talents/components/TalentViewProfile/TalentAbout'
import TalentAttachments from '../../../features/talents/components/TalentViewProfile/TalentAttachments'
import TalentGeneral from '../../../features/talents/components/TalentViewProfile/TalentGeneral'
import TalentLinks from '../../../features/talents/components/TalentViewProfile/TalentLinks'
import TalentListings from '../../../features/talents/components/TalentViewProfile/TalentListings'
import TalentNotes from '../../../features/talents/components/TalentViewProfile/TalentNotes'
import TalentSkills from '../../../features/talents/components/TalentViewProfile/TalentSkills'
import { grey3, white } from '../../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
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
import { handlePatchTalent } from '../../../utils/redux/actions/talents.action'

const DrawerTalent: React.FunctionComponent<DrawerTalentProps> = (
  props: DrawerTalentProps,
) => {
  const dispatch = useAppDispatch()

  const selectedTalent = useAppSelector((state) => getActiveTalent(state))
  const activeTab = useAppSelector((state) => getActiveTab(state))

  const [openModalShortlist, setOpenModalShortlist] = useState(false)
  const [openModalAccepted, setOpenModalAccepted] = useState(false)
  const [openModalDecline, setOpenModalDecline] = useState(false)

  const moveToInbound = () => {
    dispatch(
      handlePatchTalent({
        id: selectedTalent.id,
        status: ListingStatus.Inbound,
      }),
    )
    props.handleClose()
  }

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
          <AtTypography variant={'h4'}>
            {selectedTalent?.firstName} {selectedTalent?.lastName}
          </AtTypography>
        }
        sideTitle={
          <AtTypography color={grey3}>
            Applied: {moment(selectedTalent.appliedDate).format('DD.MM.YYYY')}
          </AtTypography>
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

        <TalentAbout talent={selectedTalent} />

        <TalentLinks talent={selectedTalent} />

        <TalentAttachments />

        <TalentNotes />

        <Box display={'flex'} justifyContent={'flex-end'} gap={2.5}>
          {selectedTalent.status !== ListingStatus.Declined ? (
            <AtButton
              onClick={() => setOpenModalDecline(true)}
              kind={AtButtonKind.Danger}
              variant={AtButtonVariant.Contained}
              name={'Decline'}
              endIcon={<CloseSquare size={16} />}
            />
          ) : null}

          {selectedTalent.status === ListingStatus.Inbound ||
          selectedTalent.status === ListingStatus.Accepted ? (
            <AtButton
              onClick={() => setOpenModalShortlist(true)}
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Outlined}
              name={'Shortlist'}
            />
          ) : null}

          {selectedTalent.status === ListingStatus.Shortlisted ? (
            <AtButton
              onClick={moveToInbound}
              kind={AtButtonKind.Default}
              variant={AtButtonVariant.Outlined}
              name={'Back to Inbound'}
            />
          ) : null}

          {selectedTalent.status === ListingStatus.Shortlisted ||
            selectedTalent.status === ListingStatus.Inbound ? (
            <AtButton
              onClick={() => setOpenModalAccepted(true)}
              kind={AtButtonKind.Success}
              variant={AtButtonVariant.Contained}
              name={'Accept'}
              endIcon={<TickSquare size={16} />}
            />
          ) : null}
        </Box>
      </Box>

      <ModalShortlist
        isOpen={openModalShortlist}
        onClose={() => {
          setOpenModalShortlist(false)
          props.handleClose()
        }}
      />

      <ModalAccepted
        isOpen={openModalAccepted}
        onClose={() => {
          setOpenModalAccepted(false)
          props.handleClose()
        }}
      />

      <ModalDecline
        isOpen={openModalDecline}
        onClose={() => {
          setOpenModalDecline(false)
          props.handleClose()
        }}
      />
    </AtDrawer>
  )
}

interface DrawerTalentProps {
  open: boolean
  handleClose: () => void
}

export default DrawerTalent
