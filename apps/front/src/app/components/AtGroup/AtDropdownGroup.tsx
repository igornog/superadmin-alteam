import React, { useEffect, useState } from 'react'
import { Collapse, Box } from '@mui/material'
import { ArrowDown2, ArrowUp2 } from 'iconsax-react'
import {
  getActiveGroup,
  getTopGroup,
  mapRecursive,
} from '../../utils/redux/selectors/group.selector'
import AtTypography from '../AtTypography/AtTypography'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook'
import { black, green, grey2, grey5 } from '../../utils/colors'
import styled, { css } from 'styled-components'
import { getActiveTab } from '../../utils/redux/selectors/settings.selector'
import { handleSelectGroup } from '../../utils/redux/actions/group.action'
import { GroupInterface } from '../../utils/redux/types/groups.type'

const StyledItem = styled(Box)<{
  level: number
  isActive?: boolean
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
`

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
`

const AtGroupItem: React.FunctionComponent<AtGroupProps> = ({
  level = 1,
  menu: menuProp,
}) => {
  const [menu, setMenu] = useState<GroupInterface[]>(menuProp || [])
  const [paddingLeft, setPaddingLeft] = useState<number>()
  const activeFolder = useAppSelector((state) => getActiveGroup(state))
  const dispatch = useAppDispatch()

  useEffect(() => {
    setMenu(menuProp)
  }, [menuProp])

  const open = (id: number) => () => {
    setMenu((prevMenu) =>
      mapRecursive(prevMenu, (item: any) => {
        if (item.id === id) {
          return { ...item, open: !item.open }
        }
        return item
      }),
    )
  }

  useEffect(() => {
    if (level) {
      setPaddingLeft(level * 10)
    }
  }, [level])

  return (
    <StyledParent level={level} heightBefore={'10px'}>
      {menu.map((item, index) => {
        return (
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
              <Box
                onClick={() =>
                  dispatch(handleSelectGroup({ idFolder: item.id }))
                }
              >
                <AtTypography>{item.name}</AtTypography>
              </Box>
              {item.subGroups.length > 0 &&
                (item.open ? (
                  <ArrowUp2 size={10} onClick={open(item.id)} />
                ) : (
                  <ArrowDown2 size={10} onClick={open(item.id)} />
                ))}
            </StyledItem>
            {item.subGroups && (
              <Collapse in={item.open} timeout="auto">
                <AtGroupItem menu={item.subGroups} level={level + 1} />
              </Collapse>
            )}
          </React.Fragment>
        )
      })}
    </StyledParent>
  )
}

const AtDropdownGroup: React.FunctionComponent = () => {
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const topParenGroup = useAppSelector((state) => getTopGroup(state))

  return (
    <StyledParent
      heightBefore={'20px'}
      level={2}
      padding={'10px'}
      paddingLeft={'20px'}
    >
      <AtTypography color={grey2}>{activeTab.title}</AtTypography>
      <AtGroupItem menu={topParenGroup?.subGroups || []} />
    </StyledParent>
  )
}

export interface AtGroupProps {
  menu: GroupInterface[]
  level?: number
}
export default AtDropdownGroup
