import { Box } from '@mui/material';
import { Element3, RowVertical } from 'iconsax-react';
import React from 'react';
import styled, { css } from 'styled-components';
import { white, black, grey } from '../../utils/colors';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook';
import { handleSwitchDisplayMode } from '../../utils/redux/actions/settings.action';
import { DisplayMode } from '../../utils/redux/types/settings.type';

const sharedIconStyle = css<{ active: boolean }>`
  transition: 0.3s;
  color: ${grey};
  position: relative;

  ${({ active }) =>
    active
      ? css`
          background-color: ${grey};
          padding: 6px;
          color: ${white};
          border-radius: 5px;
        `
      : css`
          padding: 5px;

          &:hover {
            color: ${black};
            cursor: pointer;
            transition: 0.3s;
          }
        `}
`;

const StyledElement3 = styled(Element3)`
  ${sharedIconStyle}
`;

const StyledRowVertical = styled(RowVertical)`
  ${sharedIconStyle}
`;

const StyledIconsBox = styled.div`
  background-color: #f0f1f8;
  display: flex;
  gap: 5px;
  align-items: center;
  width: fit-content;
  padding: 5px;
  border-radius: 5px;
`;

const AtSwitchDisplayMode: React.FunctionComponent = () => {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const handleSwitchMode = (mode: DisplayMode) => {
    dispatch(handleSwitchDisplayMode(mode));
  };

  return (
    <Box display={'flex'}>
      <StyledIconsBox>
        <StyledElement3
          size={20}
          active={settings.displayMode === DisplayMode.Grid}
          onClick={() => handleSwitchMode(DisplayMode.Grid)}
        />

        <StyledRowVertical
          size={20}
          active={settings.displayMode === DisplayMode.List}
          onClick={() => handleSwitchMode(DisplayMode.List)}
        />
      </StyledIconsBox>
    </Box>
  );
};

export default AtSwitchDisplayMode;
