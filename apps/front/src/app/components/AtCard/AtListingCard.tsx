import { Box } from '@mui/material'
import { ArrowRight2 } from 'iconsax-react'
import styled, { css } from 'styled-components'
import { green, grey3, grey5, white } from '../../utils/colors'
import AtLine from '../AtLine/AtLine'
import AtStatusTag from '../AtStatusTag/AtStatusTag'
import AtGroupTag from '../AtGroupTag/AtGroupTag'
import AtTypography from '../AtTypography/AtTypography'
import { boxShadow } from '../../utils/theme'
import moment from 'moment'
import { ClientListing, ListingState, ListingStatus } from '@yjcapp/app'
import AtTag from '../AtTag/AtTag'

export const StyledCard = styled.div<{ fullHeight?: boolean }>`
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

const AtListingCard: React.FunctionComponent<AtListingCardProps> = (
  props: AtListingCardProps,
) => {
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
      case ListingStatus.Draft:
        return (
          <AtStatusTag status={ListingStatus.Draft} label={ListingStatus.Draft} />
        )
      case ListingStatus.Running:
        return (
          <AtStatusTag status={ListingStatus.Running} label={ListingStatus.Running} />
        )
      default: return true
    }
  }

  return (
    <StyledCard onClick={props.onClick} fullHeight={props.fullHeight}>
      <Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Box display={'flex'} gap={'5px'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'}>
              <AtTypography variant={'h5'} $bold={true}>
                {props.listing.listingName}
              </AtTypography>
              <Box display={'flex'} gap={'10px'} marginLeft={'15px'} alignItems={'center'}>
                {getListingStatus(props.listing.status)}
              </Box>
            </Box>
            <AtTypography variant={'body1'} $bold={true}>

              {props.listing.soloClient.companyName}
            </AtTypography>
          </Box>

          <Box
            display={'flex'}
            gap={'5px'}
            flexDirection={'column'}
            alignItems={'flex-end'}
          >
            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
              <AtTypography color={grey3}>
                <>Created on: {moment(props.listing.createdAt).format('DD.MM.YYYY')}</>
              </AtTypography>
              <AtGroupTag icon={<ArrowRight2 size={10} />} />
            </Box>
          </Box>
        </Box>

        <AtLine spacing={16} />

        <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
          {props.listing.skills?.map(
            (skill: string, index: number) => {
              return (
                <AtTag
                  label={skill}
                  key={index}
                />
              )
            },
          )}
        </Box>

        <AtLine spacing={16} />

        <AtTypography color={grey3}>
          {props.listing.jobDescription}
        </AtTypography>
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
