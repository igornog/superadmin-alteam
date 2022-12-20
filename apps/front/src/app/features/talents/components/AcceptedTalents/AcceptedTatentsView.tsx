import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import TalentsSwitchMode from '../../../../components/app/talents/TalentsSwitchMode'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import AtLine from '../../../../components/AtLine/AtLine'
import AtSpace from '../../../../components/AtSpace/AtSpace'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook'
import { handleLoadTree } from '../../../../utils/redux/actions/tree.action'
import { Column } from '../../../../utils/redux/types/settings.type'
import AcceptedFolderListing from './AcceptedFolderListing'
import AcceptedTalentsHeader from './AcceptedTalentsHeader'

const AcceptedTatentsView: React.FunctionComponent = () => {
  const talents = useAppSelector((state) => state.talents)
  const listTalent = talents.listTalents

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(handleLoadTree())
  }, [dispatch])

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <AcceptedFolderListing />

        <AtLine spacing={30} />

        <AcceptedTalentsHeader />

        <AtSpace direction={'vertical'} spacing={'20'} />

        {listTalent.length === 0 ? (
          <AtNoResult sentence={`No Accepted Talents`} />
        ) : (
          <TalentsSwitchMode
            tableColumns={[
              Column.Talent,
              Column.Applied,
              Column.Availability,
              Column.AssignedTo,
              Column.Skills,
            ]}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default AcceptedTatentsView
