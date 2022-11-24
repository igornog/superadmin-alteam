import { TreeItem, treeItemClasses } from '@mui/lab'
import { Box, Tooltip } from '@mui/material'
import { AddCircle, Folder, FolderAdd } from 'iconsax-react'
import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled, { css } from 'styled-components'
import { black, blue, green, grey2 } from '../../utils/colors'
import { convertHexToRGBA } from '../../utils/helpers'
import { useAppDispatch } from '../../utils/hooks/reduxHook'
import { Tree, TreeInterface } from '../../utils/redux/types/tree.type'
import AtCheckbox from '../AtCheckbox/AtCheckbox'
import AtTypography from '../AtTypography/AtTypography'

const sharedTreeState = css`
  transition: background-color 0.2s;
  position: absolute;
  pointer-events: none;
  content: '';
  top: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  left: -5px;
  border-radius: 5px;
`

const StyledTreeItem = styled(TreeItem)<{
  isParent: boolean
}>`
  padding-top: 10px;
  position: relative;

  & > .${treeItemClasses.content} {
    ${({ isParent }) =>
      isParent &&
      css`
        .${treeItemClasses.iconContainer} {
          display: none;
        }
        &:before {
          ${sharedTreeState}
          background-color: ${convertHexToRGBA(black, 0.05)};
        }

        &:hover {
          svg {
            position: relative;
          }
          &:before {
            ${sharedTreeState}
            background-color: ${green};
          }
        }
      `}
  }

  .${treeItemClasses.content} {
    padding: 0;
    margin-bottom: 5px;
    position: relative;
    background-color: transparent;
    align-items: flex-start;

    ${({ isParent }) =>
      !isParent &&
      css`
        &:hover {
          background-color: transparent;

          &:before {
            ${sharedTreeState}
            background-color: ${convertHexToRGBA(blue, 0.05)};
          }
        }
      `}
  }

  .${treeItemClasses.selected},
    &.${treeItemClasses.selected}.${treeItemClasses.focused} {
    background-color: transparent !important;
  }
`

const StyledAddFolder = styled(AddCircle)`
  color: ${grey2};
  transition: 0.3s;

  &:hover {
    color: ${black};
    transition: 0.3s;
  }
`

const getNodeById = (
  node: TreeInterface,
  id: string,
  parentsPath: string[],
): any => {
  let result = null

  if (node.id === id) {
    return node
  } else if (Array.isArray(node.children)) {
    for (const childNode of node.children) {
      result = getNodeById(childNode, id, parentsPath)

      // eslint-disable-next-line no-extra-boolean-cast
      if (!!result) {
        parentsPath.push(node.id)
        return result
      }
    }

    return result
  }

  return result
}

const AtTreeItem: React.FunctionComponent<AtTreeItemProps> = (
  props: AtTreeItemProps,
) => {
  const selectedSet = useMemo(() => new Set(props.selected), [props.selected])
  const node = new Tree(props.nodes)

  const parentMap = useMemo(() => {
    return goThroughAllNodes(node)
  }, [])

  function goThroughAllNodes(
    nodes: TreeInterface,
    map: Record<string, any> = {},
  ) {
    if (!nodes.children) {
      return null
    }

    map[nodes.id] = getAllChild(nodes).splice(1)

    for (const childNode of nodes.children) {
      goThroughAllNodes(childNode, map)
    }

    return map
  }

  function getAllChild(
    childNode: TreeInterface | null,
    collectedNodes: string[] = [],
  ) {
    if (childNode === null) return collectedNodes

    collectedNodes.push(childNode.id)

    if (Array.isArray(childNode.children)) {
      for (const node of childNode.children) {
        getAllChild(node, collectedNodes)
      }
    }

    return collectedNodes
  }

  const getChildById = (nodes: TreeInterface, id: string) => {
    const array: string[] = []
    const path: string[] = []

    const nodeToToggle = getNodeById(nodes, id, path)

    return { childNodesToToggle: getAllChild(nodeToToggle, array), path }
  }

  function getOnChange(checked: boolean, nodes: TreeInterface) {
    const { childNodesToToggle, path } = getChildById(node, nodes.id)

    let array = checked
      ? [...props.selected, ...childNodesToToggle]
      : props.selected
          .filter((value: string) => !childNodesToToggle.includes(value))
          .filter((value: string) => !path.includes(value))

    array = array.filter((v: string, i: number) => array.indexOf(v) === i)

    props.setSelected(array)
  }

  const [showAddFolder, setShowAddFolder] = useState(false)
  const checkboxRef = useRef<any>(null)

  const allSelectedChildren =
    parentMap &&
    parentMap[node.id]?.every((childNodeId: string) =>
      selectedSet.has(childNodeId),
    )
  const checked = selectedSet.has(node.id) || allSelectedChildren || false

  const indeterminate =
    (parentMap &&
      parentMap[node.id]?.some((childNodeId: string) =>
        selectedSet.has(childNodeId),
      )) ||
    false

  if (allSelectedChildren && !selectedSet.has(node.id)) {
    props.setSelected([...props.selected, node.id])
  }

  const handleClickRow = (e: React.MouseEvent, nodes: TreeInterface) => {
    e.stopPropagation()
    getOnChange(!checkboxRef.current.checked, nodes)
  }

  const handleCreateFolder = (e: React.MouseEvent, node: TreeInterface) => {
    props.setSelectedFolder(node)
    props.setOpenCreateFolder(true)
    e.stopPropagation()
  }

  return (
    <StyledTreeItem
      key={node.id}
      nodeId={node.id}
      isParent={node.isParent()}
      label={
        <Box display={'flex'} flexDirection={'column'}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            width={'100%'}
            onMouseEnter={() => !node.isParent() && setShowAddFolder(true)}
            onMouseLeave={() => !node.isParent() && setShowAddFolder(false)}
            onClick={(e: React.MouseEvent) =>
              node.isParent()
                ? handleCreateFolder(e, node)
                : handleClickRow(e, node)
            }
          >
            <Box display={'flex'} alignItems={'center'} gap={'15px'}>
              <AtTypography>
                {!node.isParent() ? (
                  <Folder size={20} />
                ) : (
                  <FolderAdd size={20} />
                )}{' '}
                {node.name}
              </AtTypography>
              {showAddFolder && (
                <Tooltip
                  title={`Create folder in ${node.name}`}
                  arrow={true}
                  placement={'right'}
                >
                  <StyledAddFolder
                    size={16}
                    onClick={(e) => handleCreateFolder(e, node)}
                  />
                </Tooltip>
              )}
            </Box>

            {!node.isParent() && (
              <AtCheckbox
                checked={checked}
                indeterminate={!checked && indeterminate}
                onChange={(event) =>
                  getOnChange(event.currentTarget.checked, node)
                }
                checkboxRef={checkboxRef}
              />
            )}
          </Box>
        </Box>
      }
    >
      {Array.isArray(node.children)
        ? node.children.map((node: TreeInterface, index: number) => (
            <AtTreeItem
              nodes={node}
              setOpenCreateFolder={props.setOpenCreateFolder}
              setSelectedFolder={props.setSelectedFolder}
              key={index}
              selected={props.selected}
              setSelected={props.setSelected}
            />
          ))
        : null}
    </StyledTreeItem>
  )
}

interface AtTreeItemProps {
  nodes: TreeInterface
  setOpenCreateFolder: Dispatch<SetStateAction<boolean>>
  setSelectedFolder: Dispatch<SetStateAction<TreeInterface | undefined>>
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
}

export default AtTreeItem
