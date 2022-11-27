import React, { useState } from 'react'
import { TreeView } from '@mui/lab'
import { ArrowDown2, ArrowRight2 } from 'iconsax-react'
import styled from 'styled-components'
import ModalAddFolder from '../AtModal/modals/ModalAddFolder'
import { TreeInterface } from '../../utils/redux/types/tree.type'
import { useAppSelector } from '../../utils/hooks/reduxHook'
import AtTreeItem from './AtTreeItem'

const StyledTreeView = styled(TreeView)`
  background-color: #f7f8fe;
  padding: 15px;
  padding-top: 5px;
  border-radius: 5px;
  height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
`

const AtTree: React.FunctionComponent = () => {
  const [openCreateFolder, setOpenCreateFolder] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<TreeInterface>()
  const tree = useAppSelector((state) => state.tree)
  const [selected, setSelected] = useState<string[]>([])

  return (
    <StyledTreeView
      defaultCollapseIcon={<ArrowDown2 />}
      defaultExpanded={['Parent']}
      defaultExpandIcon={<ArrowRight2 />}
    >
      <AtTreeItem
        nodes={tree.data}
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

export default AtTree
