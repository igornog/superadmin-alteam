import { Backdrop, Box, Collapse, Grid, useMediaQuery } from '@mui/material'
import {
  AddCircle,
  Import,
  SearchNormal1,
  Share,
  TickCircle,
} from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook'
import { handleCollapsePanel } from '../../utils/redux/actions/app.action'
import { getActiveTab } from '../../utils/redux/selectors/settings.selector'
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton'
import DrawerCreateClient from '../AtDrawer/drawers/DrawerCreateClient/DrawerCreateClient'
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
import debounce from 'lodash.debounce'
import { handleUpdateFilter } from '../../utils/redux/actions/settings.action'
import AtSortByDropdown from '../AtDropdown/AtSortByDropdown'
import { SortTypes } from '../../utils/redux/types/settings.type'
import { getActiveGroup } from '../../utils/redux/selectors/group.selector'

const StyledContent = styled(Grid) <{ $sidePanelSize?: string }>`
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
  const activeGroup = useAppSelector((state) => getActiveGroup(state))

  const debouncedSearch = debounce((searchValue: string) => {
    dispatch(handleUpdateFilter({ searchName: searchValue }))
  }, 500)

  const handleSearchChange = (searchValue: string) => {
    debouncedSearch(searchValue)
  }

  const sortOptions = [
    { id: 0, value: null, label: 'None' },
    { id: 1, value: SortTypes.Alphabetical, label: 'A to Z' },
    { id: 2, value: SortTypes.MostRecent, label: 'Most Recent' },
  ]
  if (!activeTab?.status) {
    sortOptions.push(
      { id: 3, value: SortTypes.Status, label: 'Status' }
    )
  }

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
                  <AtTopTitle activeTab={activeTab} activeGroup={activeGroup} />

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
                      !activeGroup.isParent() && (
                        <>
                          <AtButton
                            kind={AtButtonKind.Default}
                            variant={AtButtonVariant.Contained}
                            startIcon={<Share />}
                            onClick={() => setOpenShareFolder(true)}
                            name={'Share Folder'}
                          />

                          <ModalShareFolder
                            folder={activeGroup}
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
                          folder={activeGroup}
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
                        onValueChange={handleSearchChange}
                        type={AtTextFieldType.Text}
                        placeholder={'Search in most recent...'}
                        startIcon={<SearchNormal1 />}
                      />
                    )}
                  </Grid>
                  <Box display={'flex'} gap={'30px'}>
                    {activeTab.settings.displayMode && <AtSwitchDisplayMode />}
                    {activeTab.settings.sortBy && (
                      <AtSortByDropdown sortOptions={sortOptions} />
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
