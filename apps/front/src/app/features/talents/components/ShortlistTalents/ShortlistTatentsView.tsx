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
import { Column, SortTypes } from '../../../../utils/redux/types/settings.type'
import ShortlistFolderListing from './ShortlistFolderListing'
import ShortlistTalentsHeader from './ShortlistTalentsHeader'

const ShortlistTalentsView: React.FunctionComponent = () => {
  const settings = useAppSelector((state) => state.settings)
  const talents = useAppSelector((state) => state.talents)
  let listTalents = talents.listTalents

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(handleLoadTree())
  }, [dispatch])

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
            listTalents={listTalents}
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
