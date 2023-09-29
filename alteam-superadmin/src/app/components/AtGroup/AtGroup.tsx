import React, { useState } from 'react'
import { TreeView } from '@mui/lab'
import { ArrowDown2, ArrowRight2 } from 'iconsax-react'
import styled from 'styled-components'
import ModalAddFolder from '../AtModal/modals/ModalAddFolder'
import { useAppSelector } from '../../utils/hooks/reduxHook'
import AtGroupItem from './AtGroupItem'
import { GroupInterface } from '../../utils/redux/types/groups.type'

const StyledTreeView = styled(TreeView)`
  background-color: #f7f8fe;
  padding: 15px;
  padding-top: 5px;
  border-radius: 5px;
  height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
`

const AtGroup: React.FunctionComponent = () => {
  const [openCreateFolder, setOpenCreateFolder] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<GroupInterface>()
  const group = useAppSelector((state) => state.groups)
  const [selected, setSelected] = useState<number[]>([])

  return (
    <StyledTreeView
      defaultCollapseIcon={<ArrowDown2 />}
      defaultExpanded={['Parent']}
      defaultExpandIcon={<ArrowRight2 />}
    >
      <AtGroupItem
        nodes={group.data}
        setOpenCreateFolder={setOpenCreateFolder}
        setSelectedFolder={setSelectedFolder}
        selected={selected}
        setSelected={setSelected}
      />

      <ModalAddFolder
        folder={selectedFolder}
        isOpen={openCreateFolder}
        onClose={() => setOpenCreateFolder(false)}
      />
    </StyledTreeView>
  )
}

export default AtGroup
