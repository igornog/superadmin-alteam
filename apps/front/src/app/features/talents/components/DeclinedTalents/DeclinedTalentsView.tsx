import { Grid } from '@mui/material'
import React from 'react'
import TalentsSwitchMode from '../../../../components/app/talents/TalentsSwitchMode'
import AtTypography from '../../../../components/AtTypography/AtTypography'
import { grey3 } from '../../../../utils/colors'
import { useAppSelector } from '../../../../utils/hooks/reduxHook'
import { Column } from '../../../../utils/redux/types/settings.type'

const DeclinedTalentsView: React.FunctionComponent = () => {
  const talents = useAppSelector((state) => state.talents)
  const listTalent = talents.listTalents

  return (
    <Grid container={true} spacing={2.5} marginTop={0} alignItems={'stretch'}>
      {listTalent.length === 0 ? (
        <Grid item={true} xs={12}>
          <AtTypography variant={'h3'} color={grey3}>
            No Recent Candidates
          </AtTypography>
        </Grid>
      ) : (
        <Grid item={true} xs={12}>
          <TalentsSwitchMode
            tableColumns={[
              Column.Talent,
              Column.Applied,
              Column.Availability,
              Column.Skills,
            ]}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default DeclinedTalentsView
