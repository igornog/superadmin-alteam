import { Grid } from '@mui/material'
import React from 'react'
import TalentsSwitchMode from '../../../../components/app/talents/TalentsSwitchMode'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { Column } from '../../../../utils/redux/types/settings.type'
import { sortBy } from '../../../../utils/helpers'

const InboundTalentsView: React.FunctionComponent = () => {
  const talents = useAppSelector((state) => state.talents)
  const settings = useAppSelector((state) => state.settings)

  const talentsSorted = settings.sort ? sortBy(settings.sort, talents.listTalents) : talents.listTalents

  return talentsSorted.length === 0 ? (
    <AtNoResult sentence={`No Inbound Talents`} />
  ) : (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      <Grid item={true} xs={12}>
        <TalentsSwitchMode
          listTalents={talentsSorted}
          displayStatusTag={false}
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

export default InboundTalentsView
