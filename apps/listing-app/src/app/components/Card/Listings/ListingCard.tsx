import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import styled, { css } from 'styled-components'
import { green, grey3, grey5, white } from '../../../utils/colors'
import AtLine from '../../Line/Line'
import AtTypography from '../../Typography/Typography'
import { boxShadow } from '../../../utils/theme'
import moment from 'moment'
import { AtButtonKind, AtButtonVariant } from '../../Button/Button'
import CustomButton from '../../Button/Button'
import { ArrowRight2, Briefcase } from 'iconsax-react'
import { ClientListing, ListingState, ListingStatus } from '@yjcapp/app'
import Typography from '../../Typography/Typography'
import AtStatusTag from '../../Tag/StatusTag'

export const StyledCard = styled.div<{ fullHeight?: boolean, isSmallScreen?: boolean }>`
  background-color: ${white};
  border: 1px solid ${grey5};
  border-radius: 10px;
  padding: 20px;
  transition: 0.3s;
  min-height: 120px;
  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}

  &:hover {
    box-shadow: ${boxShadow};
    transition: 0.3s;
    cursor: pointer;
    border-color: ${green};
  }
`

const getListingStatus = (status?: ListingState | ListingStatus) => {
  switch (status) {
    case ListingState.Active:
      return (
        <AtStatusTag status={ListingStatus.Active} label={ListingStatus.Active} />
      )
    case ListingStatus.Disabled:
      return (
        <AtStatusTag status={ListingStatus.Disabled} label={ListingStatus.Disabled} />
      )
    case ListingStatus.Ended:
      return (
        <AtStatusTag status={ListingStatus.Ended} label={ListingStatus.Ended} />
      )
    default: return true
  }
}

const AtListingCard: React.FunctionComponent<AtListingCardProps> = (
  props: AtListingCardProps,
) => {
  const isSmallScreen = useMediaQuery('(max-width:1079px)')
  
  return (
    <StyledCard onClick={props.onClick} fullHeight={props.fullHeight} isSmallScreen={isSmallScreen}>
      <Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Box display={'flex'} gap={'10px'} flexDirection={'column'} width={'100%'}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                <AtTypography variant={'body1'} fontSize={'20px'} $bold>
                  {props.listing.listingName}
                </AtTypography>
                {getListingStatus(props.listing.status)}
              </Box>
              <CustomButton
                variant={AtButtonVariant.Contained}
                startIcon={<ArrowRight2 />}
                kind={AtButtonKind.Success}
              />
            </Box>
            <Box
              display={'flex'}
              gap={'5px'}
              justifyContent={'space-between'}
              flexDirection={isSmallScreen ? 'column' : 'row'}
            >
              <Box display={'flex'} gap={'5px'} alignItems={'center'}>
                <Briefcase />
                <AtTypography variant={'body1'} fontSize={'20px'}>
                  {props.listing.soloClient.companyName}
                </AtTypography>
              </Box>
              <AtTypography color={grey3}>
                <>Created on: {moment(props.listing.createdAt).format('DD.MM.YYYY')}</>
              </AtTypography>
            </Box>
          </Box>

        </Box>

        <AtLine spacing={10} />

        <Typography color={grey3} fontSize={'12px'} ellipsis={3}>
          {props.listing.jobDescription}
        </Typography>

      </Box>
    </StyledCard>

  )
}

interface AtListingCardProps {
  listing: ClientListing
  fullHeight?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default AtListingCard
