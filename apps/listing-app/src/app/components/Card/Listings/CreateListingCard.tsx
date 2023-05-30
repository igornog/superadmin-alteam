import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { green, grey5, white } from '../../../utils/colors'
import AtTypography from '../../Typography/Typography'
import { boxShadow } from '../../../utils/theme'

export const StyledForm = styled.div`
  background-color: ${white};
  border-radius: 5px;
`

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  background-color: ${white};
  border: 1px solid ${grey5};
  border-radius: 5px;
  transition: 0.3s;
  width: inherit;

  &:hover {
    box-shadow: ${boxShadow};
    transition: 0.3s;
    cursor: pointer;
    border-color: ${green};
  }

  div {
    place-items: center;
    padding: 52px;

    img {
      width: 40px;
      height: 40px;
    }

    @media (max-width: 1079px) {
      padding: 20px;
      gap: 10px;

      img {
        width: 30px;
        height: 30px;
      }
    }
  }
`

const AtCreateListingCard: React.FC<CreateListingCardProps> = (
  props: CreateListingCardProps,
) => {
  const isSmallScreen = useMediaQuery('(max-width:1079px)')

  return (
    <StyledCard onClick={props.onClick}>
      <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
        <img src={props.icon} alt={'Folder'} />
        <AtTypography
          variant={'h5'}
          fontSize={isSmallScreen ? '.675rem' : '1.5rem'}
        >
          {props.listingOption}
        </AtTypography>
      </Box>
    </StyledCard>
  )
}

interface CreateListingCardProps {
  listingOption?: string
  icon?: string
  onClick?: (e: React.MouseEvent) => void
}

export default AtCreateListingCard
