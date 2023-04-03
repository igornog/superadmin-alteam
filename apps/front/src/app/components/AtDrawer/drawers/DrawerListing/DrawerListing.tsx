import { Box, Collapse, Grid } from '@mui/material'
import { ArrowDown, ArrowLeft2, ArrowUp } from 'iconsax-react'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { grey2 } from '../../../../utils/colors'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHook'
import { handleSelectTalent } from '../../../../utils/redux/actions/talents.action'
import { getActiveClient } from '../../../../utils/redux/selectors/clients.selector'
import AtButton, {
  AtButtonVariant,
  AtButtonKind,
} from '../../../AtButton/AtButton'
import AtGroupTag from '../../../AtGroupTag/AtGroupTag'
import AtSwitch from '../../../AtSwitch/AtSwitch'
import AtTypography from '../../../AtTypography/AtTypography'
import AtDrawer from '../../AtDrawer'
import DrawerTalent from '../DrawerTalent'
import GeneralInformations from './GeneralInformations'
import JobDescription from './JobDescription'
import ScreeningQuestions from './ScreeningQuestions'

const StyledCollapse = styled(Collapse)<{ isOpen: boolean }>`
  position: relative;

  &:before {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    ${({ isOpen }) =>
      !isOpen &&
      css`
        content: '';
        background: linear-gradient(
          0deg,
          rgba(251, 252, 255, 1) 25%,
          rgba(0, 0, 0, 0) 100%
        );
      `}
  }
`

const DrawerListing: React.FunctionComponent<DrawerListingProps> = (
  props: DrawerListingProps,
) => {
  const selectedClient = useAppSelector((state) => getActiveClient(state))
  const dispatch = useAppDispatch()

  const [isActivated, setIsActivated] = useState(true)
  const [collapseWhole, setCollapseWhole] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleClickTalent = (id: number) => {
    dispatch(handleSelectTalent(id))
    setOpenDrawer(true)
  }

  return (
    <AtDrawer
      size={'calc(100% - 145px)'}
      backgroundColor={'#F7F8FE'}
      withBackdrop={false}
      open={props.open}
      handleClose={props.handleClose}
    >
      <Grid container={true}>
        <Grid xs={12}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            padding={'25px 20px 25px 20px'}
            gap={'25px'}
          >
            <Box display={'flex'} gap={'5px'} alignItems={'center'}>
              <AtButton
                variant={AtButtonVariant.Contained}
                startIcon={<ArrowLeft2 />}
                kind={AtButtonKind.Default}
                onClick={props.handleClose}
              />
              <AtTypography color={grey2}>
                Back to {selectedClient.companyName}
              </AtTypography>
            </Box>

            <Box display={'flex'} justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                <AtGroupTag
                  label={selectedClient.companyName}
                  fontSize={'14px'}
                />
                <AtTypography variant={'h3'}>
                  {props.selectedListing.listingName}
                </AtTypography>
              </Box>

              <AtSwitch
                label={
                  <AtTypography variant="caption" color={grey2}>
                    {isActivated ? 'Activate Listing:' : 'Deactivate Listing:'}
                  </AtTypography>
                }
                onChange={() => setIsActivated(!isActivated)}
                forceColors={true}
              />
            </Box>

            <StyledCollapse
              in={collapseWhole}
              isOpen={collapseWhole}
              collapsedSize={315}
            >
              <Box display={'flex'} flexDirection={'column'} gap={'25px'}>
                <GeneralInformations selectedListing={props.selectedListing} />

                <JobDescription selectedListing={props.selectedListing} />

                <ScreeningQuestions selectedListing={props.selectedListing} />
              </Box>
            </StyledCollapse>

            <Box display={'flex'} justifyContent={'center'}>
              <AtButton
                kind={AtButtonKind.Default}
                variant={AtButtonVariant.Text}
                startIcon={collapseWhole ? <ArrowUp /> : <ArrowDown />}
                name={`${collapseWhole ? 'Collapse' : 'Open'} Project Details`}
                fontSize={'14px'}
                onClick={() => setCollapseWhole(!collapseWhole)}
              />
            </Box>

            <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
              <AtTypography variant={'h4'}>
                All Talent In This Project
              </AtTypography>

              <Grid container={true} spacing={2.5} alignItems={'stretch'}>
                {/* {props.selectedListing.talent?.map((talentId: string) => {
                  return (
                    <Grid
                      item={true}
                      xs={6}
                      xl={4}
                      display={'flex'}
                      flexDirection={'column'}
                    >
                      <AtTalentCard
                        idTalent={talentId}
                        onClick={() => handleClickTalent(talentId)}
                      />
                    </Grid>
                  )
                })} */}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <DrawerTalent
        open={openDrawer}
        handleClose={() => setOpenDrawer(false)}
      />
    </AtDrawer>
  )
}

interface DrawerListingProps {
  open: boolean
  handleClose: () => void
  selectedListing: any
}

export default DrawerListing
