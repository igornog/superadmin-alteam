import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/reduxHook'
import { handleDrawer } from '../../../utils/redux/actions/settings.action'
import { handleSelectTalent } from '../../../utils/redux/actions/talents.action'
import {
  SideDrawerVariant,
  DisplayMode,
  Column,
} from '../../../utils/redux/types/settings.type'
import ModalAccepted from '../../AtModal/modals/ModalAccepted/ModalAccepted'
import ModalEmailToTalent from '../../AtModal/modals/ModalEmailToTalent'
import ModalShortlist from '../../AtModal/modals/ModalShortlist/ModalShortlist'
import ClientCard from './ClientCard'
import ClientsTable from './ClientsTable'

const ClientsSwitchMode: React.FunctionComponent<ClientsSwitchModeProps> = (
  props: ClientsSwitchModeProps,
) => {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  const talents = useAppSelector((state) => state.talents)
  const listTalent = talents.listTalents

  const [openShortlistModal, setOpenShortlistModal] = useState(false)
  const [openAcceptedModal, setOpenAcceptedModal] = useState(false)
  const [openEmailToTalent, setOpenEmailToTalent] = useState(false)

  const handleClickTalent = (id: number) => {
    dispatch(handleSelectTalent(id))
    dispatch(handleDrawer(SideDrawerVariant.Talent))
  }

  return (
    <Grid container={true} spacing={2.5} alignItems={'stretch'}>
      {settings.displayMode === DisplayMode.Grid ? (
        <ClientCard
          talents={listTalent}
          openTalent={handleClickTalent}
          openShortlist={() => setOpenShortlistModal(true)}
          openAccepted={() => setOpenAcceptedModal(true)}
          openEmailToTalent={() => setOpenEmailToTalent(true)}
        />
      ) : (
        <Grid item={true} xs={12}>
          <ClientsTable
            talents={listTalent}
            openTalent={handleClickTalent}
            tableColumns={props.tableColumns}
            openShortlist={() => setOpenShortlistModal(true)}
            openAccepted={() => setOpenAcceptedModal(true)}
            openEmailToTalent={() => setOpenEmailToTalent(true)}
          />
        </Grid>
      )}

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

interface ClientsSwitchModeProps {
  tableColumns: Column[]
}

export default ClientsSwitchMode
