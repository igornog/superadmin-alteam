import { Backdrop, Box, Collapse, Grid, useMediaQuery } from '@mui/material'
import {
  AddCircle,
  Candle,
  SearchNormal1,
} from 'iconsax-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { grey2 } from '../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook'
import { handleCollapsePanel } from '../../utils/redux/actions/app.action'
import { getActiveTab } from '../../utils/redux/selectors/settings.selector'
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton'
import AtDropdown, { DropdownItem } from '../AtDropdown/AtDropdown'
import ModalAddFolder from '../AtModal/modals/ModalAddFolder'
import AtNavbar from '../AtNavbar/AtNavbar'
import AtListingNavPage from '../AtNavPage/AtListingNavPage'
import AtTextField, { AtTextFieldType } from '../AtTextField/AtTextField'
import AtTypography from '../AtTypography/AtTypography'
import debounce from 'lodash.debounce'
import { handleActiveSort, handleUpdateFilter } from '../../utils/redux/actions/settings.action'
import { SortTypes } from '../../utils/redux/types/settings.type'

const SortOptions = [
  { id: 0, value: '', label: 'None' },
  { id: 1, value: SortTypes.Draft, label: 'Draft' },
  { id: 2, value: SortTypes.Activated, label: 'Activated' },
  { id: 3, value: SortTypes.Running, label: 'Running' },
  { id: 4, value: SortTypes.Desactivated, label: 'Ended' },
  { id: 5, value: SortTypes.Ended, label: 'Desactivated' }
]

const StyledContent = styled(Grid) <{ $sidePanelSize?: string }>`
  overflow: hidden;
  background-color: #f7f8fe;
  margin: 20px 20px 30px 165px;
`

const StyledSidePanel = styled(Collapse)`
  position: fixed;
  right: 0;
`

const AtListingLayout: React.FunctionComponent<AtListingLayoutProps> = (
  props: AtListingLayoutProps,
) => {
  const [openCreateFolder, setOpenCreateFolder] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width:1079px)')
  const activeTab = useAppSelector((state) => getActiveTab(state))
  const app = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  const debouncedSearch = debounce((searchValue: string) => {
    dispatch(handleUpdateFilter({ searchName: searchValue }))
  }, 500)

  const handleSearchChange = (searchValue: string) => {
    debouncedSearch(searchValue)
  }

  const handleSort = async (item: DropdownItem) => {
    await dispatch(handleActiveSort({ sort: item.value as string }))
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
            <AtListingNavPage
              sidePanelIcon={props.sidePanelIcon} />

            <Box
              display={'flex'}
              justifyContent={'space-between'}
              marginTop={'30px'}
            >
              <Box display={'flex'} gap={'30px'}>
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
                      // folder={activeFolder}
                      isOpen={openCreateFolder}
                      onClose={() => setOpenCreateFolder(false)}
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
                    placeholder={'Search in listings...'}
                    startIcon={<SearchNormal1 />}
                  />
                )}
              </Grid>
              <Box display={'flex'} gap={'30px'}>
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
                      $listItems={SortOptions}
                      kind={AtButtonKind.Default}
                      variant={AtButtonVariant.Contained}
                      handleselect={handleSort}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
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

interface AtListingLayoutProps {
  children: React.ReactNode
  title?: string
  sidePanel?: React.ReactNode
  sidePanelIcon?: React.ReactNode
  sidePanelSize?: 'small' | 'medium'
}

export default AtListingLayout
