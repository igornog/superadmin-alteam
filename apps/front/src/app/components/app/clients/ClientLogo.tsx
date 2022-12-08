import { Box } from '@mui/material'
import { Briefcase } from 'iconsax-react'
import React from 'react'
import styled from 'styled-components'
import { grey5, grey3 } from '../../../utils/colors'

const StyledBox = styled(Box)<{ width?: string }>`
  background-color: ${grey5};
  border-radius: 5px;
  padding: 4px;
  display: flex;
`

const StyledBriefCase = styled(Briefcase)<{ width?: string }>`
  width: ${({ width }) => width ?? '100%'};
  height: ${({ width }) => width ?? '100%'};
  color: ${grey3};
`

const ClientLogo: React.FunctionComponent<ClientLogoProps> = (
  props: ClientLogoProps,
) => {
  return props.logo ? (
    <img src={props.logo} alt={'Client Logo'} width={props.width} />
  ) : (
    <StyledBox width={props.width}>
      <StyledBriefCase size={16} />
    </StyledBox>
  )
}

interface ClientLogoProps {
  logo?: string
  width?: string
}

export default ClientLogo
