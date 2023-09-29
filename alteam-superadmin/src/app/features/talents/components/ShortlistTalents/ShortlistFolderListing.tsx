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
import { GroupInterface } from '../../../../utils/redux/types/groups.type'

const ShortlistFolderListing: React.FunctionComponent<ShortlistFolderListingProps> = (
  props: ShortlistFolderListingProps
) => {
  const dispatch = useAppDispatch()
  const selectedFolder = useAppSelector((state) => getActiveGroup(state))
  const nbChildren = selectedFolder?.subGroups?.length ?? false

  const selectFolder = (idFolder: number) => {
    dispatch(handleSelectGroup({ idFolder }))
  }

  return (
    <Grid container spacing={2.5}>
      {props.groups.status === StatusType.Succeeded ? (
        selectedFolder.id ? (
          selectedFolder.hasChildren() ? (
            selectedFolder.subGroups?.map((item: GroupInterface) => {
              return (
                <Grid item xs={nbChildren > 4 ? 2.4 : 3} key={item.id}>
                  <AtFolder
                    folder={item}
                    onClick={() => selectFolder(item.id)}
                    minimize={nbChildren > 4}
                  />
                </Grid>
              )
            })
          ) : (
            <Grid item xs={3}>
              <AtCreateFolder />
            </Grid>
          )
        ) : props.groups.data.length > 0 ? (
          props.groups.data.map((group: GroupInterface) => {
            const nbChildren = props.groups?.data?.length ?? false

            return (
              <Grid item xs={nbChildren > 4 ? 2.4 : 3} key={group.id}>
                <AtFolder
                  folder={group}
                  onClick={() => selectFolder(group.id)}
                  minimize={nbChildren > 4}
                />
              </Grid>
            )
          })
        ) : (
          <Grid item xs={3}>
            <AtCreateFolder />
          </Grid>
        )
      ) : (
        <Grid item xs={3}>
          <AtFolder loading />
        </Grid>
      )}
    </Grid>
  )
}

export default ShortlistFolderListing

interface ShortlistFolderListingProps {
  groups: any
}
