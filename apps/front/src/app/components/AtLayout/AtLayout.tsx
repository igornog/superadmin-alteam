import { Backdrop, Box, Collapse, Grid, useMediaQuery } from '@mui/material';
import { AddCircle, Candle, Import, SearchNormal1 } from 'iconsax-react';
import React from 'react';
import styled from 'styled-components';
import { grey2 } from '../../utils/colors';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook';
import { handleCollapsePanel } from '../../utils/redux/actions/app.action';
import { getActiveTab } from '../../utils/redux/selectors/settings.selector';
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton';
import AtDropdown from '../AtDropdown/AtDropdown';
import AtNavbar from '../AtNavbar/AtNavbar';
import AtNavPage from '../AtNavPage/AtNavPage';
import AtRightClick from '../AtRightClick/AtRightClick';
import CreateTalentMenu from '../AtRightClick/ContextMenus/CreateTalentMenu';
import AtTextField, { AtTextFieldType } from '../AtTextField/AtTextField';
import AtTypography from '../AtTypography/AtTypography';
import AtSwitchDisplayMode from './AtSwitchDisplayMode';

const StyledContent = styled(Grid)<{ $sidePanelSize?: string }>`
  background-color: #f7f8fe;
  margin: 20px 20px 30px 165px;
`;

const StyledSidePanel = styled(Collapse)`
  position: fixed;
  right: 0;
`;

const AtLayout: React.FunctionComponent<AtLayoutProps> = (
  props: AtLayoutProps
) => {
  const isSmallScreen = useMediaQuery('(max-width:1079px)');

  const activeTab = useAppSelector((state) => getActiveTab(state));
  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  return !isSmallScreen ? (
    activeTab && (
      <>
        <AtNavbar />
        <Grid container={true}>
          <StyledContent
            item={true}
            xs={true}
            $sidePanelSize={props.sidePanelSize}
          >
            <AtNavPage sidePanelIcon={props.sidePanelIcon} />

            <AtRightClick contextMenu={<CreateTalentMenu />}>
              <Box>
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

                    {activeTab.settings.createFolder && (
                      <AtButton
                        kind={AtButtonKind.Success}
                        variant={AtButtonVariant.Contained}
                        startIcon={<AddCircle />}
                        name={'Create folder'}
                      />
                    )}

                    {activeTab.settings.inviteTalent && (
                      <AtButton
                        kind={AtButtonKind.Success}
                        variant={AtButtonVariant.Contained}
                        startIcon={<AddCircle />}
                        name={'Create Talent'}
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
                        value={''}
                        type={AtTextFieldType.Text}
                        placeholder={'Search in Inbound talents ...'}
                        startIcon={<SearchNormal1 />}
                      />
                    )}
                  </Grid>

                  <Box display={'flex'} gap={'30px'} alignItems={'center'}>
                    {activeTab.settings.displayMode && <AtSwitchDisplayMode />}

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
                          value={''}
                          listItems={[
                            { id: 0, label: 'None' },
                            { id: 1, label: 'None' },
                          ]}
                          size={'small'}
                          bgColor={'black'}
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Box>
            </AtRightClick>

            {props.children}
          </StyledContent>

          {app.sidePanel.isFixed ? (
            props.sidePanel
          ) : (
            <>
              <Backdrop
                open={app.sidePanel.isVisible}
                onClick={() => dispatch(handleCollapsePanel(false))}
                invisible={true}
              />
              <StyledSidePanel
                in={app.sidePanel.isVisible}
                orientation={'horizontal'}
              >
                {props.sidePanel}
              </StyledSidePanel>
            </>
          )}
        </Grid>
      </>
    )
  ) : (
    <Box
      display={'flex'}
      height={'100vh'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <AtTypography>
        This application is not suitable for small screens
      </AtTypography>
    </Box>
  );
};

interface AtLayoutProps {
  children: React.ReactNode;
  title?: string;
  sidePanel?: React.ReactNode;
  sidePanelIcon?: React.ReactNode;
  sidePanelSize?: 'small' | 'medium';
}

export default AtLayout;
