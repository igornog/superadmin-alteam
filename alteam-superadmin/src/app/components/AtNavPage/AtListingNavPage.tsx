import { Box, useMediaQuery } from '@mui/material'
import { AddCircle, ArrowLeft2 } from 'iconsax-react'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { black, grey2, white } from '../../utils/colors'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHook'
import {
  handleCollapsePanel,
  handleInitPage,
} from '../../utils/redux/actions/app.action'
import { handleActiveTab } from '../../utils/redux/actions/settings.action'
import { Page } from '../../utils/redux/types/settings.type'
import AtTab from '../AtTab/AtTab'
import AtTypography from '../AtTypography/AtTypography'
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton'
import DrawerCreateListing from '../AtDrawer/drawers/DrawerCreateListing/DrawerCreateListing'

const StyledNavPage = styled.div<{ isWideScreen: boolean }>`
  background-color: #0f152708;
  display: flex;
  gap: 10px;
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

const AtListingNavPage: React.FunctionComponent<AtNavPageProps> = (
  props: AtNavPageProps,
) => {
  const settings = useAppSelector((state) => state.settings)
  const listings = useAppSelector((state) => state.listings)
  const app = useAppSelector((state) => state.app)
  const isWideScreen = useMediaQuery('(min-width:1920px)')

  const dispatch = useAppDispatch()
  const navPageRef = useRef<any>(null)

  const [openCreateListing, setOpenCreateListing] = useState(false)

  const handleClick = (page: Page) => {
    dispatch(handleInitPage())
    dispatch(handleActiveTab(page))
  }

  const createListing = () => {
    setOpenCreateListing(true)
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'flex-end'}
      alignItems={'center'}
      gap={2.5}
    >

      <Box marginRight={'auto'}>
        <AtTypography variant={'h3'}>
          All Listings
        </AtTypography>
      </Box>

      <StyledNavPage ref={navPageRef} isWideScreen={isWideScreen}>
        {settings.tabs.map((page: Page, index: number) => (
          <AtTab
            label={page.title}
            badge={listings.listListings.filter((listing) => listing.listingType === page.title).length}
            key={index}
            $active={page.active}
            onClick={() => handleClick(page)}
            width={'10vw'}
          />
        ))}
      </StyledNavPage>

      <AtButton
        kind={AtButtonKind.Success}
        variant={AtButtonVariant.Contained}
        startIcon={<AddCircle />}
        name={'Create Listing'}
        onClick={createListing}
      />

      {!app.sidePanel.isFixed && props.sidePanelIcon && (
        <StyledSidePanelIcon
          onClick={() => dispatch(handleCollapsePanel(true))}
        >
          <ArrowLeft2 size={10} />
          {props.sidePanelIcon}
        </StyledSidePanelIcon>
      )}

      <DrawerCreateListing
        open={openCreateListing}
        handleClose={() => setOpenCreateListing(false)}
      />
    </Box>
  )
}

interface AtNavPageProps {
  sidePanelIcon?: React.ReactNode
}

export default AtListingNavPage
