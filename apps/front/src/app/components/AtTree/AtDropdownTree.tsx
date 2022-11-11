import React, { useEffect, useState } from 'react';
import { Collapse, Box } from '@mui/material';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import {
  getActiveFolder,
  mapRecursive,
} from '../../utils/redux/selectors/tree.selector';
import { TreeInterface } from '../../utils/redux/types/tree.type';
import AtTypography from '../AtTypography/AtTypography';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook';
import { black, green, grey2, grey5 } from '../../utils/colors';
import styled, { css } from 'styled-components';
import { getActiveTab } from '../../utils/redux/selectors/settings.selector';
import { handleSelectFolder } from '../../utils/redux/actions/tree.action';

const StyledItem = styled(Box)<{
  level: number;
  isActive?: boolean;
}>`
  transition: 0.3s;
  color: ${({ isActive }) => (isActive ? black : grey2)};
  position: relative;

  &:hover {
    transition: 0.3s;
    cursor: pointer;
    color: ${black};
  }

  ${({ isActive }) =>
    isActive &&
    css<{ level: number }>`
      &:after {
        position: absolute;
        content: '';
        left: calc(${({ level }) => (level - 1) * 10 + 'px'} - 0.5px);
        background-color: ${green};
        border-radius: 10px;
        width: 1px;
        height: calc(100% - 8px);
        border: 1px solid ${green};
      }
    `}
`;

const StyledParent = styled(Box)<{ level: number; heightBefore: string }>`
  position: relative;

  &:before {
    position: absolute;
    content: '';
    top: 10px;
    border-radius: 10px;
    left: ${({ level }) => (level - 1) * 10 + 'px'};
    background-color: ${grey5};
    border: 1px solid ${grey5};
    height: calc(100% - ${({ heightBefore }) => heightBefore});
  }
`;

const AtTreeItem: React.FunctionComponent<AtTreeProps> = ({
  level = 1,
  menu: menuProp,
}) => {
  const [menu, setMenu] = useState<TreeInterface[]>(menuProp || []);
  const [paddingLeft, setPaddingLeft] = useState<number>();
  const activeFolder = useAppSelector((state) => getActiveFolder(state));
  const dispatch = useAppDispatch();

  const open = (id: string) => () => {
    setMenu((prevMenu) =>
      mapRecursive(prevMenu, (item: any) => {
        if (item.id === id) {
          return { ...item, open: !item.open };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if (level) {
      setPaddingLeft(level * 10);
    }
  }, [level]);

  return (
    <StyledParent level={level} heightBefore={'10px'}>
      {menu.map((item, index) => (
        <React.Fragment key={`${index}-${item.id}`}>
          <StyledItem
            level={level}
            paddingLeft={paddingLeft + 'px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            isActive={activeFolder.id === item.id}
            paddingTop={'10px'}
          >
            <Box onClick={() => dispatch(handleSelectFolder(item.id))}>
              <AtTypography>{item.name}</AtTypography>
            </Box>
            {item.children &&
              (item.open ? (
                <ArrowUp2 size={10} onClick={open(item.id)} />
              ) : (
                <ArrowDown2 size={10} onClick={open(item.id)} />
              ))}
          </StyledItem>
          {item.children && (
            <Collapse in={item.open} timeout="auto">
              <AtTreeItem menu={item.children} level={level + 1} />
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </StyledParent>
  );
};

const AtDropdownTree: React.FunctionComponent<AtTreeProps> = ({
  level = 1,
  menu: menuProp,
}: AtTreeProps) => {
  const activeTab = useAppSelector((state) => getActiveTab(state));

  return (
    <StyledParent
      heightBefore={'20px'}
      level={2}
      padding={'10px'}
      paddingLeft={'20px'}
    >
      <AtTypography color={grey2}>{activeTab.title}</AtTypography>
      <AtTreeItem menu={menuProp} level={level} />
    </StyledParent>
  );
};

export interface AtTreeProps {
  menu: TreeInterface[] | undefined;
  level?: number;
}
export default AtDropdownTree;
