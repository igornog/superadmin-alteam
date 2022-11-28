import {
  AddCircle,
  MessageEdit,
  Share,
  TickCircle,
  TrushSquare,
} from 'iconsax-react'
import React from 'react'
import AtTypography from '../../AtTypography/AtTypography'
import { AtContextMenuItem } from '../AtRightClick'

const FolderMenu: React.FunctionComponent<FolderMenuProps> = (
  props: FolderMenuProps,
) => {
  return (
    <>
      <AtContextMenuItem onSelect={props.openCreateFolder}>
        <AtTypography>
          <AddCircle size={20} />
          Create New Folder
        </AtTypography>
      </AtContextMenuItem>

      <AtContextMenuItem onSelect={props.openAssignFolderToClient}>
        <AtTypography>
          <TickCircle size={20} />
          Assign to Client
        </AtTypography>
      </AtContextMenuItem>

      <AtContextMenuItem onSelect={props.openRenameFolder}>
        <AtTypography>
          <MessageEdit size={20} />
          Rename Folder
        </AtTypography>
      </AtContextMenuItem>

      <AtContextMenuItem onSelect={props.openShareFolder}>
        <AtTypography>
          <Share size={20} />
          Share Folder
        </AtTypography>
      </AtContextMenuItem>

      <AtContextMenuItem variant="danger" onSelect={props.openRemoveFolder}>
        <AtTypography>
          <TrushSquare size={20} />
          Delete Folder
        </AtTypography>
      </AtContextMenuItem>
    </>
  )
}

interface FolderMenuProps {
  openCreateFolder: () => void
  openRenameFolder: () => void
  openShareFolder: () => void
  openRemoveFolder: () => void
  openAssignFolderToClient: () => void
}

export default FolderMenu
