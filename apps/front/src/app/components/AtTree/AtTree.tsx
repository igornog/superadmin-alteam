import React, { useMemo, useRef, useState } from 'react';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { TreeView } from '@mui/lab';
import { AddCircle, ArrowDown2, ArrowRight2, Folder } from 'iconsax-react';
import { Box, Tooltip } from '@mui/material';
import AtCheckbox from '../AtCheckbox/AtCheckbox';
import styled from 'styled-components';
import { black, grey2, grey6 } from '../../utils/colors';
import { convertHexToRGBA } from '../../utils/helpers';
import AtTypography from '../AtTypography/AtTypography';

export interface TreeInterface {
  id: string;
  name: string;
  children?: readonly TreeInterface[];
}

const StyledTreeItem = styled(TreeItem)`
  padding-top: 10px;

  .${treeItemClasses.content} {
    padding: 0;
    margin-bottom: 5px;
    position: relative;
    background-color: transparent;

    &:hover {
      background-color: transparent;

      &:before {
        position: absolute;
        pointer-events: none;
        content: '';
        top: -5px;
        width: calc(100% + 10px);
        height: calc(100% + 10px);
        left: -5px;
        background-color: ${convertHexToRGBA(black, 0.05)};
        border-radius: 5px;
      }
    }
  }

  .${treeItemClasses.selected},
    &.${treeItemClasses.selected}.${treeItemClasses.focused} {
    background-color: transparent !important;
  }
`;

const StyledAddFolder = styled(AddCircle)`
  color: ${grey2};
  transition: 0.3s;

  &:hover {
    color: ${black};
    transition: 0.3s;
  }
`;

const StyledTreeView = styled(TreeView)`
  background-color: ${grey6};
  padding: 15px;
  padding-top: 5px;
  border-radius: 5px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const AtTree: React.FunctionComponent<AtTreeProps> = (props: AtTreeProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const parentMap = useMemo(() => {
    return goThroughAllNodes(props.data);
  }, []);

  function goThroughAllNodes(
    nodes: TreeInterface,
    map: Record<string, any> = {}
  ) {
    if (!nodes.children) {
      return null;
    }

    map[nodes.id] = getAllChild(nodes).splice(1);

    for (const childNode of nodes.children) {
      goThroughAllNodes(childNode, map);
    }

    return map;
  }

  function getAllChild(
    childNode: TreeInterface | null,
    collectedNodes: string[] = []
  ) {
    if (childNode === null) return collectedNodes;

    collectedNodes.push(childNode.id);

    if (Array.isArray(childNode.children)) {
      for (const node of childNode.children) {
        getAllChild(node, collectedNodes);
      }
    }

    return collectedNodes;
  }

  const getChildById = (nodes: TreeInterface, id: string) => {
    const array: string[] = [];
    const path: string[] = [];

    const getNodeById = (
      node: TreeInterface,
      id: string,
      parentsPath: string[]
    ): any => {
      let result = null;

      if (node.id === id) {
        return node;
      } else if (Array.isArray(node.children)) {
        for (const childNode of node.children) {
          result = getNodeById(childNode, id, parentsPath);

          // eslint-disable-next-line no-extra-boolean-cast
          if (!!result) {
            parentsPath.push(node.id);
            return result;
          }
        }

        return result;
      }

      return result;
    };

    const nodeToToggle = getNodeById(nodes, id, path);

    return { childNodesToToggle: getAllChild(nodeToToggle, array), path };
  };

  function getOnChange(checked: boolean, nodes: TreeInterface) {
    console.log(checked, nodes);
    const { childNodesToToggle, path } = getChildById(props.data, nodes.id);

    let array = checked
      ? [...selected, ...childNodesToToggle]
      : selected
          .filter((value) => !childNodesToToggle.includes(value))
          .filter((value) => !path.includes(value));

    array = array.filter((v, i) => array.indexOf(v) === i);

    setSelected(array);
  }

  const RenderTree = (nodes: TreeInterface) => {
    const [showAddFolder, setShowAddFolder] = useState(false);
    const checkboxRef = useRef<any>(null);

    const allSelectedChildren =
      parentMap &&
      parentMap[nodes.id]?.every((childNodeId: string) =>
        selectedSet.has(childNodeId)
      );
    const checked = selectedSet.has(nodes.id) || allSelectedChildren || false;

    const indeterminate =
      (parentMap &&
        parentMap[nodes.id]?.some((childNodeId: string) =>
          selectedSet.has(childNodeId)
        )) ||
      false;

    if (allSelectedChildren && !selectedSet.has(nodes.id)) {
      setSelected([...selected, nodes.id]);
    }

    const handleClickRow = (e: React.MouseEvent, nodes: TreeInterface) => {
      e.stopPropagation();
      getOnChange(!checkboxRef.current.checked, nodes);
    };

    return (
      <StyledTreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            width={'100%'}
            onMouseEnter={() => setShowAddFolder(true)}
            onMouseLeave={() => setShowAddFolder(false)}
            onClick={(e: React.MouseEvent) => handleClickRow(e, nodes)}
          >
            <Box display={'flex'} alignItems={'center'} gap={'15px'}>
              <AtTypography>
                <Folder size={20} /> {nodes.name}
              </AtTypography>
              {showAddFolder && (
                <Tooltip
                  title={`Create folder in ${nodes.name}`}
                  arrow={true}
                  placement={'right'}
                >
                  <StyledAddFolder size={16} />
                </Tooltip>
              )}
            </Box>
            <AtCheckbox
              checked={checked}
              indeterminate={!checked && indeterminate}
              onChange={(event) =>
                getOnChange(event.currentTarget.checked, nodes)
              }
              checkboxRef={checkboxRef}
            />
          </Box>
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node: TreeInterface) => RenderTree(node))
          : null}
      </StyledTreeItem>
    );
  };

  return (
    <StyledTreeView
      defaultCollapseIcon={<ArrowDown2 />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ArrowRight2 />}
    >
      {RenderTree(props.data)}
    </StyledTreeView>
  );
};

interface AtTreeProps {
  data: TreeInterface;
}

export default AtTree;
