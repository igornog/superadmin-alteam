import { Box, useMediaQuery } from '@mui/material'
import { ArrowLeft2 } from 'iconsax-react'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { black, grey2, white } from '../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook'
import {
  handleCollapsePanel,
  handleInitPage,
  handleSidePanel,
} from '../../utils/redux/actions/app.action'
import { handleActiveTab } from '../../utils/redux/actions/settings.action'
import { Page } from '../../utils/redux/types/settings.type'
import AtTab from '../AtTab/AtTab'

export const StyledNavPage = styled.div<{ isWideScreen?: boolean }>`
  background-color: #0f152708;
  display: flex;
  gap: 10px;
  width: ${({ isWideScreen }) => (isWideScreen ? 'fit-content' : '100%')};
  padding: 5px;
  border-radius: 10px;
`

const StyledSidePanelIcon = styled.div`
  background-color: ${white};
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 14px 10px;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  color: ${grey2};

  &:hover {
    background-color: ${black};
    color: ${white};
    transition: 0.3s;
  }
`

const AtNavPage: React.FunctionComponent<AtNavPageProps> = (
  props: AtNavPageProps,
) => {
  const settings = useAppSelector((state) => state.settings)
  const app = useAppSelector((state) => state.app)
  const isSmallScreen = useMediaQuery('(max-width:1338px)')
  const isWideScreen = useMediaQuery('(min-width:1920px)')

  const dispatch = useAppDispatch()
  const navPageRef = useRef<any>(null)

  const handleClick = (page: Page) => {
    dispatch(handleInitPage())
    dispatch(handleActiveTab(page))
  }

  useEffect(() => {
    dispatch(handleSidePanel(!isSmallScreen))
  }, [dispatch, isSmallScreen])

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      gap={2.5}
    >
      <StyledNavPage ref={navPageRef} isWideScreen={isWideScreen}>
        {settings.tabs.map((page: Page, index: number) => (
          <AtTab
            label={page.title}
            // badge={page.badge}
            key={index}
            $active={page.active}
            onClick={() => handleClick(page)}
            width={
              isWideScreen
                ? 'fit-content'
                : `calc(100% / ${settings.tabs.length})`
            }
          />
        ))}
      </StyledNavPage>

      {!app.sidePanel.isFixed && props.sidePanelIcon && (
        <StyledSidePanelIcon
          onClick={() => dispatch(handleCollapsePanel(true))}
        >
          <ArrowLeft2 size={10} />
          {props.sidePanelIcon}
        </StyledSidePanelIcon>
      )}
    </Box>
  )
}

interface AtNavPageProps {
  sidePanelIcon?: React.ReactNode
}

export default AtNavPage
