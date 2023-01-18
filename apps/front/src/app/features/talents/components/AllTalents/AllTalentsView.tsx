import { Grid } from '@mui/material'
import React from 'react'
import TalentsSwitchMode from '../../../../components/app/talents/TalentsSwitchMode'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { Column } from '../../../../utils/redux/types/settings.type'
import { getActiveTab } from '../../../../utils/redux/selectors/settings.selector'
import { ListingStatus } from '@yjcapp/app'

const AllTalentsView: React.FunctionComponent = () => {
  const talents = useAppSelector((state) => state.talents)
  const activeTab = useAppSelector((state) => getActiveTab(state))
  let listTalents = talents.listTalents

  if(!activeTab.status){      
    listTalents = listTalents.filter((talent: any) => talent.status !== ListingStatus.Declined)
  }

  return listTalents.length === 0 ? (
    <AtNoResult sentence={`No Talents`} />
  ) : (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      <Grid item={true} xs={12}>
        <TalentsSwitchMode
          listTalents={listTalents}
          displayStatusTag={true}
          tableColumns={[
            Column.Talent,
            Column.Applied,
            Column.Availability,
            Column.Status,
            Column.Skills,
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default AllTalentsView
