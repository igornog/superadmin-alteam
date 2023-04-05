import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handleSelectTalent } from '../../../utils/redux/actions/talents.action'
import { DisplayMode, Column } from '../../../utils/redux/types/settings.type'
import DrawerTalent from '../../AtDrawer/drawers/DrawerTalent'
import ModalAccepted from '../../AtModal/modals/ModalAccepted/ModalAccepted'
import ModalEmailToTalent from '../../AtModal/modals/ModalEmailToTalent'
import ModalShortlist from '../../AtModal/modals/ModalShortlist/ModalShortlist'
import TalentCard from './TalentCard'
import TalentsTable from './TalentsTable'
import { Talent } from '../../../utils/redux/types/talents.type'

const TalentsSwitchMode: React.FunctionComponent<TalentsSwitchModeProps> = (
  props: TalentsSwitchModeProps,
) => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openShortlistModal, setOpenShortlistModal] = useState(false)
  const [openAcceptedModal, setOpenAcceptedModal] = useState(false)
  const [openEmailToTalent, setOpenEmailToTalent] = useState(false)

  const handleClickTalent = (id: number) => {
    dispatch(handleSelectTalent(id))
    setOpenDrawer(true)
  }

  return (
    <Grid container={true} spacing={2.5} alignItems={'stretch'}>
      {settings.displayMode === DisplayMode.Grid ? (
        <TalentCard
          talents={props.talents}
          displayStatusTag={props.displayStatusTag}
          openTalent={handleClickTalent}
          openShortlist={() => setOpenShortlistModal(true)}
          openAccepted={() => setOpenAcceptedModal(true)}
          openEmailToTalent={() => setOpenEmailToTalent(true)}
        />
      ) : (
        <Grid item={true} xs={12}>
          <TalentsTable
            talents={props.talents}
            openTalent={handleClickTalent}
            tableColumns={props.tableColumns}
            openShortlist={() => setOpenShortlistModal(true)}
            openAccepted={() => setOpenAcceptedModal(true)}
            openEmailToTalent={() => setOpenEmailToTalent(true)}
          />
        </Grid>
      )}

      <DrawerTalent
        open={openDrawer}
        handleClose={() => setOpenDrawer(false)}
      />

      <ModalAccepted
        isOpen={openAcceptedModal}
        onClose={() => setOpenAcceptedModal(false)}
      />

      <ModalShortlist
        isOpen={openShortlistModal}
        onClose={() => setOpenShortlistModal(false)}
      />

      <ModalEmailToTalent
        isOpen={openEmailToTalent}
        onClose={() => setOpenEmailToTalent(false)}
      />
    </Grid>
  )
}

interface TalentsSwitchModeProps {
  tableColumns: Column[]
  talents: Talent[]
  displayStatusTag?: boolean
}

export default TalentsSwitchMode
