import React from 'react'
import { Box } from '@mui/material'
import AtTypography from '../Typography/Typography'
import CustomLink from '../Link/Link'
import styled from 'styled-components'
import { grey } from '../../utils/colors'

const StyledFooter = styled(Box)`
  width: fill-available;
  padding: 35px 7vw;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1079px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  p {
    color: ${grey};
  }
`

const Footer: React.FC = () => {
  const privacyPolicyLink = 'https://yjcollective.notion.site/Privacy-policy-1a2a1a083c9349de929ef38a051f36ca'

  return (
    <StyledFooter>
      <AtTypography>
        Alteam is an initiave and brand of YJCollective Limited
      </AtTypography>
      <Box display={'flex'} gap={'30px'}>
        <CustomLink externalLink={privacyPolicyLink}>
          <AtTypography>Terms and Conditions</AtTypography>
        </CustomLink>
        <CustomLink externalLink={privacyPolicyLink}>
          <AtTypography>Privacy Policy</AtTypography>
        </CustomLink>
      </Box>
    </StyledFooter>
  )
}

export default Footer
