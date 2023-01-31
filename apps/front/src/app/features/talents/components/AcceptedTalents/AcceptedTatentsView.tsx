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
import { handleLoadGroups } from '../../../../utils/redux/actions/group.action'
import { getActiveTab } from '../../../../utils/redux/selectors/settings.selector'
import { Column } from '../../../../utils/redux/types/settings.type'
import { Talent } from '../../../../utils/redux/types/talents.type'
import AcceptedFolderListing from './AcceptedFolderListing'
import AcceptedTalentsHeader from './AcceptedTalentsHeader'

const AcceptedTatentsView: React.FunctionComponent = () => {
  const talents = useAppSelector((state) => state.talents)
  const activeTab = useAppSelector((state) => getActiveTab(state))

  const listTalents = talents.listTalents.filter(
    (talent: Talent) => talent.status === activeTab.status,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(handleLoadGroups({}))
  }, [dispatch])

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <AcceptedFolderListing />

        <AtLine spacing={30} />

        <AcceptedTalentsHeader />

        <AtSpace direction={'vertical'} spacing={'20'} />

        {listTalents.length === 0 ? (
          <AtNoResult sentence={`No Accepted Talents`} />
        ) : (
          <TalentsSwitchMode
            talents={listTalents}
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
