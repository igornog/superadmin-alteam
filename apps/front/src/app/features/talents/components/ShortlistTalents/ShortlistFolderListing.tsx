import { Grid } from '@mui/material'
import React from 'react'
import AtCreateFolder from '../../../../components/AtFolder/AtCreateFolder'
import AtFolder from '../../../../components/AtFolder/AtFolder'
import {
  useAppSelector,
  useAppDispatch,
} from '../../../../utils/hooks/reduxHook'
import { handleSelectGroup } from '../../../../utils/redux/actions/group.action'
import { StatusType } from '../../../../utils/redux/types/status.type'
import { getActiveGroup } from '../../../../utils/redux/selectors/group.selector'
import {
  Group,
  GroupInterface
} from '../../../../utils/redux/types/groups.type'

const ShortlistFolderListing: React.FunctionComponent = () => {
  const group = useAppSelector((state) => state.groups)
  const dispatch = useAppDispatch()
  const folder = useAppSelector((state) => getActiveGroup(state))
  const selectedFolder = folder ?? new Group(group.data)
  const nbChildren = selectedFolder?.subGroups?.length ?? false

  const selectFolder = (idFolder: number) => {
    dispatch(handleSelectGroup(idFolder))
  }

  return (
    <Grid container={true} spacing={2.5}>
      {group.status === StatusType.Succeeded ? (
        selectedFolder.hasChildren() ? (
          selectedFolder.subGroups?.map(
            (item: GroupInterface) => {
              return (
                <Grid item={true} xs={nbChildren > 4 ? 2.4 : 3} key={item.id}>
                  <AtFolder
                    folder={item}
                    onClick={() => selectFolder(item.id)}
                    minimize={nbChildren > 4}
                  />
                </Grid>
              )
            },
          )
        ) : (
          <Grid item={true} xs={3}>
            <AtCreateFolder />
          </Grid>
        )
      ) : (
        <Grid item={true} xs={3}>
          <AtFolder loading={true} />
        </Grid>
      )}
    </Grid>
  )
}

export default ShortlistFolderListing
