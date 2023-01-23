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
import ShortlistFolderListing from './ShortlistFolderListing'
import ShortlistTalentsHeader from './ShortlistTalentsHeader'
import { sortBy } from '../../../../utils/helpers'

const ShortlistTalentsView: React.FunctionComponent = () => {
  const settings = useAppSelector((state) => state.settings)
  const talents = useAppSelector((state) => state.talents)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(handleLoadTree())
  }, [dispatch])

  const talentsSorted = settings.sort ? sortBy(settings.sort, talents.listTalents) : talents.listTalents

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <ShortlistFolderListing />

        <AtLine spacing={30} />

        <ShortlistTalentsHeader />

        <AtSpace direction={'vertical'} spacing={'20'} />

        {talentsSorted.length === 0 ? (
          <AtNoResult sentence={`No Shortlisted Talents`} />
        ) : (
          <TalentsSwitchMode
            listTalents={talentsSorted}
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
