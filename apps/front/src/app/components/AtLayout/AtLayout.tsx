import { Box, Grid } from '@mui/material';
import {
  AddCircle,
  Candle,
  Element3,
  Import,
  RowVertical,
  SearchNormal1,
} from 'iconsax-react';
import React from 'react';
import styled, { css } from 'styled-components';
import { black, grey, grey2, white } from '../../utils/colors';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook';
import { handleSwitchDisplayMode } from '../../utils/redux/actions/settings.action';
import { getActiveTab } from '../../utils/redux/selectors/settings.selector';
import { DisplayMode } from '../../utils/redux/types/settings.type';
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton';
import AtDropdown from '../AtDropdown/AtDropdown';
import AtNavbar from '../AtNavbar/AtNavbar';
import AtNavPage from '../AtNavPage/AtNavPage';
import AtTextField, { AtTextFieldType } from '../AtTextField/AtTextField';
import AtTypography from '../AtTypography/AtTypography';

const StyledContent = styled(Grid)<{ sidePanelSize?: string }>`
  background-color: #f7f8fe;
  margin: 20px 255px 20px 165px;
  margin-right: ${({ sidePanelSize }) =>
    sidePanelSize === 'small'
      ? '255px'
      : sidePanelSize === 'medium'
      ? '540px'
      : '20px'};
  width: 100%;
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

const AtLayout: React.FunctionComponent<AtLayoutProps> = (
  props: AtLayoutProps
) => {
  const activeTab = useAppSelector((state) => getActiveTab(state));
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const handleSwitchMode = (mode: DisplayMode) => {
    dispatch(handleSwitchDisplayMode(mode));
  };

  return (
    <>
      <AtNavbar />
      <Grid container={true}>
        <StyledContent item={true} sidePanelSize={props.sidePanelSize}>
          <AtNavPage />

          <Box
            display={'flex'}
            justifyContent={'space-between'}
            marginTop={'30px'}
          >
            <AtTypography variant={'h3'}>{activeTab.title}</AtTypography>

            <Box display={'flex'} gap={'10px'}>
              {activeTab.settings.downloadCSV && (
                <AtButton
                  kind={AtButtonKind.Default}
                  variant={AtButtonVariant.Text}
                  startIcon={<Import />}
                  fontSize={'14px'}
                  name={'Download CSV'}
                />
              )}

              {activeTab.settings.inviteTalent && (
                <AtButton
                  kind={AtButtonKind.Success}
                  variant={AtButtonVariant.Contained}
                  startIcon={<AddCircle />}
                  name={'Invite Talents'}
                />
              )}
            </Box>
          </Box>

          <Grid
            container={true}
            marginTop={'20px'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Grid item={true} xs={6.5}>
              {activeTab.settings.search && (
                <AtTextField
                  type={AtTextFieldType.Text}
                  placeholder={'Search in Inbound talents ...'}
                  startIcon={<SearchNormal1 />}
                />
              )}
            </Grid>

            <Box display={'flex'} gap={'30px'} alignItems={'center'}>
              {activeTab.settings.displayMode && (
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
              )}
              {activeTab.settings.sortBy && (
                <Box
                  display={'flex'}
                  gap={'5px'}
                  justifyContent={'flex-end'}
                  alignItems={'center'}
                >
                  <AtTypography color={grey2}>
                    <Candle /> Sort by:
                  </AtTypography>
                  <AtDropdown
                    listItems={[{ id: 0, label: 'None' }]}
                    size={'small'}
                    bgColor={'black'}
                  />
                </Box>
              )}
            </Box>
          </Grid>
          {props.children}
        </StyledContent>
      </Grid>

      {props.sidePanel}
    </>
  );
};

interface AtLayoutProps {
  children: React.ReactNode;
  title?: string;
  sidePanel?: React.ReactNode;
  sidePanelSize?: 'small' | 'medium';
}

export default AtLayout;
