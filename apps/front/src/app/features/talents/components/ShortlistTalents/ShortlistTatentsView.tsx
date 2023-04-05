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
import ShortlistFolderListing from './ShortlistFolderListing'
import ShortlistTalentsHeader from './ShortlistTalentsHeader'
import { sortBy } from '../../../../utils/helpers'

const ShortlistTalentsView: React.FunctionComponent = () => {
  const settings = useAppSelector((state) => state.settings)
  const talents = useAppSelector((state) => state.talents)
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(handleLoadGroups({}))
  }, [dispatch])

  const listTalents = talents.listTalents.filter(
    (talent: Talent) => talent.status === activeTab.status,
  )
  const talentsSorted = settings.sort ? sortBy(settings.sort, talents.listTalents) : talents.listTalents

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <ShortlistFolderListing />

        <AtLine spacing={30} />

        <ShortlistTalentsHeader />

        <AtSpace direction={'vertical'} spacing={'20'} />

        {listTalents.length === 0 ? (
          <AtNoResult sentence={`No Shortlisted Talents`} />
        ) : (
          <TalentsSwitchMode
            talents={talentsSorted}
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

export default ShortlistTalentsView
