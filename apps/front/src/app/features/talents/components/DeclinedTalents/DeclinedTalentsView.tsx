import { Grid } from '@mui/material'
import React from 'react'
import TalentsSwitchMode from '../../../../components/app/talents/TalentsSwitchMode'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { getActiveTab } from '../../../../utils/redux/selectors/settings.selector'
import { Column } from '../../../../utils/redux/types/settings.type'
import { sortBy } from '../../../../utils/helpers'
import { Talent } from '../../../../utils/redux/types/talents.type'

const DeclinedTalentsView: React.FunctionComponent = () => {
  const settings = useAppSelector((state) => state.settings)
  const talents = useAppSelector((state) => state.talents)
  const activeTab = useAppSelector((state) => getActiveTab(state))

  const listTalents = talents.listTalents.filter(
    (talent: Talent) => talent.status === activeTab.status,
  )

  const talentsSorted = settings.sort ? sortBy(settings.sort, talents.listTalents) : talents.listTalents

  return listTalents.length === 0 ? (
    <AtNoResult sentence={`No Declined Talents`} />
  ) : (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      <Grid item={true} xs={12}>
        <TalentsSwitchMode
          talents={talentsSorted}
          tableColumns={[
            Column.Talent,
            Column.Applied,
            Column.Availability,
            Column.Skills,
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default DeclinedTalentsView
