import { Box } from '@mui/material'
import { ArrowRight2 } from 'iconsax-react'
import React from 'react'
import { grey, grey2, grey3 } from '../../utils/colors'
import AtGroupTag from '../AtGroupTag/AtGroupTag'
import AtTypography from '../AtTypography/AtTypography'
import { StyledCard } from './AtTalentCard'
import AtLine from '../AtLine/AtLine'
import AtButton, { AtButtonKind, AtButtonVariant } from '../AtButton/AtButton'
import { Listing } from '../../utils/redux/types/listings.type'

const AtListingCard: React.FunctionComponent<AtListingCardProps> = (
  props: AtListingCardProps,
) => {
  const listing = new Listing(props.listing)

  return (
    <StyledCard onClick={props.onClick} fullHeight={props.fullHeight}>
      <Box display={'flex'} flexDirection={'column'} gap={'5px'}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <AtTypography variant={'h5'} $bold={true}>
            {listing.listingName}
          </AtTypography>
          <AtGroupTag icon={<ArrowRight2 size={10} />} />
        </Box>

        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <AtTypography color={grey} variant={'body1'}>
            {listing.status}
          </AtTypography>
          {/* <AtTypography color={grey3}>
            Received: {listing.received}
          </AtTypography> */}
        </Box>

        <AtLine spacingTop={16} spacingBottom={6} />

        <Box display={'flex'} gap={'10px'}>
          <AtTypography color={grey3}>Nobody assigned</AtTypography>

          <AtButton
            kind={AtButtonKind.Default}
            variant={AtButtonVariant.Text}
            name={'Assign now'}
            fontSize={'14px'}
          />
        </Box>

        <AtLine spacingTop={6} spacingBottom={16} />

        <AtTypography color={grey2} ellipsis={3}>
          {listing.jobDescription}
        </AtTypography>
      </Box>
    </StyledCard>
  )
}

interface AtListingCardProps {
  listing: Listing
  fullHeight?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default AtListingCard
