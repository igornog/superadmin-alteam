import { Backdrop, Box, Collapse, Grid, useMediaQuery } from '@mui/material'
import {
  AddCircle,
  Candle,
  Import,
  SearchNormal1,
  Share,
  TickCircle,
} from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { grey2 } from '../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook'
import { handleCollapsePanel } from '../../utils/redux/actions/app.action'
import { getActiveTab } from '../../utils/redux/selectors/settings.selector'
import { getActiveFolder } from '../../utils/redux/selectors/tree.selector'
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton'
import DrawerCreateClient from '../AtDrawer/drawers/DrawerCreateClient/DrawerCreateClient'
import AtDropdown from '../AtDropdown/AtDropdown'
import ModalAddFolder from '../AtModal/modals/ModalAddFolder'
import ModalAddTalent from '../AtModal/modals/ModalCreateTalent/ModalAddTalent'
import ModalShareFolder from '../AtModal/modals/ModalShareFolder'
import AtNavbar from '../AtNavbar/AtNavbar'
import AtNavPage from '../AtNavPage/AtNavPage'
import AtRightClick from '../AtRightClick/AtRightClick'
import CreateTalentMenu from '../AtRightClick/ContextMenus/CreateTalentMenu'
import AtTextField, { AtTextFieldType } from '../AtTextField/AtTextField'
import AtTypography from '../AtTypography/AtTypography'
import AtSwitchDisplayMode from './AtSwitchDisplayMode'
import AtTopTitle from './AtTopTitle'

const StyledContent = styled(Grid)<{ $sidePanelSize?: string }>`
  overflow: hidden;
  background-color: #f7f8fe;
  margin: 20px 20px 30px 165px;
`

const StyledSidePanel = styled(Collapse)`
  position: fixed;
  right: 0;
`

const AtLayout: React.FunctionComponent<AtLayoutProps> = (
  props: AtLayoutProps,
) => {
  const [openCreateFolder, setOpenCreateFolder] = useState(false)
  const [openShareFolder, setOpenShareFolder] = useState(false)
  const [openCreateTalent, setOpenCreateTalent] = useState(false)
  const [openDrawerCreateClient, setOpenDrawerCreateClient] = useState(false)

  const isSmallScreen = useMediaQuery('(max-width:1079px)')
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const app = useAppSelector((state) => state.app)

  const dispatch = useAppDispatch()
  const activeFolder = useAppSelector((state) => getActiveFolder(state))

  return !isSmallScreen ? (
    activeTab && (
      <>
        <AtNavbar />
        <Grid container={true} height={'100vh'}>
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
                  <AtTopTitle
                    activeTab={activeTab}
                    activeFolder={activeFolder}
                  />

                  <Box display={'flex'} gap={'30px'}>
                    {activeTab.settings.downloadCSV && (
                      <AtButton
                        kind={AtButtonKind.Default}
                        variant={AtButtonVariant.Text}
                        startIcon={<Import />}
                        fontSize={'14px'}
                        name={'Download CSV'}
                      />
                    )}

                    {activeTab.settings.shareFolder &&
                      !activeFolder.isParent() && (
                        <>
                          <AtButton
                            kind={AtButtonKind.Default}
                            variant={AtButtonVariant.Contained}
                            startIcon={<Share />}
                            onClick={() => setOpenShareFolder(true)}
                            name={'Share Folder'}
                          />

                          <ModalShareFolder
                            folder={activeFolder}
                            isOpen={openShareFolder}
                            onClose={() => setOpenShareFolder(false)}
                          />
                        </>
                      )}

                    {activeTab.settings.verifyClient && (
                      <>
                        <AtButton
                          kind={AtButtonKind.Default}
                          variant={AtButtonVariant.Outlined}
                          startIcon={<TickCircle />}
                          name={'Verifiy Client (1)'}
                          // onClick={() => setOpenCreateTalent(true)}
                        />

                        {/* <ModalAddTalent
                          isOpen={openCreateTalent}
                          onClose={() => setOpenCreateTalent(false)}
                        /> */}
                      </>
                    )}

                    {activeTab.settings.createClient && (
                      <>
                        <AtButton
                          kind={AtButtonKind.Success}
                          variant={AtButtonVariant.Contained}
                          startIcon={<AddCircle />}
                          name={'Create Client'}
                          onClick={() => setOpenDrawerCreateClient(true)}
                        />

                        <DrawerCreateClient
                          open={openDrawerCreateClient}
                          handleClose={() => setOpenDrawerCreateClient(false)}
                        />
                      </>
                    )}

                    {activeTab.settings.createFolder && (
                      <>
                        <AtButton
                          kind={AtButtonKind.Success}
                          variant={AtButtonVariant.Contained}
                          startIcon={<AddCircle />}
                          onClick={() => setOpenCreateFolder(true)}
                          name={'Create Folder'}
                        />

                        <ModalAddFolder
                          folder={activeFolder}
                          isOpen={openCreateFolder}
                          onClose={() => setOpenCreateFolder(false)}
                        />
                      </>
                    )}

                    {activeTab.settings.inviteTalent && (
                      <>
                        <AtButton
                          kind={AtButtonKind.Success}
                          variant={AtButtonVariant.Contained}
                          startIcon={<AddCircle />}
                          name={'Create Talent'}
                          onClick={() => setOpenCreateTalent(true)}
                        />

                        <ModalAddTalent
                          isOpen={openCreateTalent}
                          onClose={() => setOpenCreateTalent(false)}
                        />
                      </>
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
                        placeholder={'Search in most recent...'}
                        startIcon={<SearchNormal1 />}
                      />
                    )}
                  </Grid>

                  <Box display={'flex'} gap={'30px'}>
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
                          placeholder={'None'}
                          $listItems={[
                            { id: 0, value: 'None', label: 'None' },
                            { id: 1, value: 'None', label: 'None' },
                          ]}
                          align={'bottom-right'}
                          kind={AtButtonKind.Default}
                          variant={AtButtonVariant.Contained}
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
  )
}

interface AtLayoutProps {
  children: React.ReactNode
  title?: string
  sidePanel?: React.ReactNode
  sidePanelIcon?: React.ReactNode
  sidePanelSize?: 'small' | 'medium'
}

export default AtLayout
