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
import { sortBy } from '../../../../utils/helpers'
import { getActiveGroup } from '../../../../utils/redux/selectors/group.selector'

const AcceptedTatentsView: React.FunctionComponent = () => {
  const talents = useAppSelector((state) => state.talents)
  const groups = useAppSelector((state) => state.groups)
  const settings = useAppSelector((state) => state.settings)
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const activeFolder = useAppSelector((state) => getActiveGroup(state))
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(handleLoadGroups({}))
  }, [dispatch])

  const listTalents = talents.listTalents.filter(
    (talent: Talent) => talent.status === activeTab.status,
  )

  const talentsSorted = settings.sort
    ? sortBy(settings.sort, listTalents)
    : listTalents

  return (
    <Grid container>
      <Grid item xs={12}>
        <AcceptedFolderListing groups={groups}/>

        <AtLine spacing={30} />

        <AcceptedTalentsHeader />

        <AtSpace direction={'vertical'} spacing={'20'} />

        {talentsSorted.length === 0 ? (
          <AtNoResult sentence={`No Accepted Talents`} />
        ) : (
          <TalentsSwitchMode
            talents={activeFolder.talents?.length ? activeFolder.talents : talentsSorted}
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
