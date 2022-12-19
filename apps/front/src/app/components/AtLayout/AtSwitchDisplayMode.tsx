import { Box } from '@mui/material'
import { Element3, RowVertical } from 'iconsax-react'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { white, grey } from '../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook'
import { handleSwitchDisplayMode } from '../../utils/redux/actions/settings.action'
import { DisplayMode } from '../../utils/redux/types/settings.type'

const sharedIconStyle = css<{ $active: boolean }>`
  transition: 0.3s;
  color: ${({ $active }) => ($active ? white : grey)};
  position: relative;

  &:hover {
    cursor: pointer;
  }
`

const StyledElement3 = styled(Element3)`
  ${sharedIconStyle}
`

const StyledRowVertical = styled(RowVertical)`
  ${sharedIconStyle}
`

const StyledIconsBox = styled.div`
  background-color: #f0f1f8;
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
`

const StyledActive = styled.div<{ transition?: number | null }>`
  position: absolute;
  content: '';
  top: 4px;
  right: ${({ transition }) => transition}px;
  width: 20px;
  height: 20px;
  transition: right 0.3s;
  border-radius: 5px;

  background-color: ${grey};
  padding: 6px;
  color: ${white};
  border-radius: 5px;
`

const AtSwitchDisplayMode: React.FunctionComponent = () => {
  const settings = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()
  const isList = settings.displayMode === DisplayMode.List
  const isGrid = settings.displayMode === DisplayMode.Grid

  const [transition, setTransition] = useState(isList ? 4 : 39)

  const handleSwitchMode = (mode: DisplayMode, transition: number) => {
    if (mode !== settings.displayMode) {
      dispatch(handleSwitchDisplayMode(mode))
      setTransition(transition)
    }
  }

  return (
    <Box display={'flex'}>
      <StyledIconsBox>
        <StyledActive transition={transition} />

        <StyledElement3
          size={20}
          $active={isGrid}
          onClick={() => handleSwitchMode(DisplayMode.Grid, transition + 35)}
        />

        <StyledRowVertical
          size={20}
          $active={isList}
          onClick={() => handleSwitchMode(DisplayMode.List, transition - 35)}
        />
      </StyledIconsBox>
    </Box>
  )
}

export default AtSwitchDisplayMode
