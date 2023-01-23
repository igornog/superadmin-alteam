import { Grid } from '@mui/material'
import React from 'react'
import TalentsSwitchMode from '../../../../components/app/talents/TalentsSwitchMode'
import AtNoResult from '../../../../components/AtLayout/AtNoResult'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { Column, SortTypes } from '../../../../utils/redux/types/settings.type'

const InboundTalentsView: React.FunctionComponent = () => {
  const settings = useAppSelector((state) => state.settings)
  const talents = useAppSelector((state) => state.talents)
  let listTalents = talents.listTalents

  if (settings.sort && listTalents.length > 0) {
    let arrayForSort = []

    switch (settings.sort) {
      case SortTypes.Alphabetical:
        arrayForSort = [...listTalents]
        listTalents = arrayForSort.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
        break;
      case SortTypes.MostRecent:
        arrayForSort = [...listTalents]
        listTalents = arrayForSort.sort((a: any, b: any) => (a.appliedDate < b.appliedDate) ? 1 : -1)
        break;
    }

    listTalents.filter(item => item)
  }

  return listTalents.length === 0 ? (
    <AtNoResult sentence={`No Inbound Talents`} />
  ) : (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      <Grid item={true} xs={12}>
        <TalentsSwitchMode
          listTalents={listTalents}
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
