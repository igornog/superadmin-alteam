import { Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import React from 'react'
import styled, { css } from 'styled-components'

interface StyledTypographyProps {
  $bold?: boolean
  color?: string
  fontSize?: string
  display?: string
  gap?: string
  flex?: number
  justifyContent?: string
  ellipsis?: number
  blurred?: boolean
}

const StyledTypography = styled(Typography) <StyledTypographyProps>`
  font-size: ${({ fontSize }) => fontSize && fontSize};
  ${({ $bold }) =>
    $bold &&
    css`
      font-family: 'Inter-Bold';
    `}

  color: ${({ color }) => (color ? color : null)};
  display: ${({ display }) => display ?? 'flex'};
  align-items: center;
  gap: ${({ gap }) => gap ?? '5px'};
  flex: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  word-break: break-word;

  ${({ ellipsis }) =>
    ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box !important;
      -webkit-line-clamp: ${ellipsis};
      -webkit-box-orient: vertical;
      white-space: normal;
    `}
`

const AtTypography: React.FunctionComponent<AtTypographyProps> = (
  props: AtTypographyProps,
) => {

  return (
    <StyledTypography
      {...props}
      $bold={props.$bold}
      variant={props.variant ?? 'body2'}
      color={props.color}
      display={props.display}
      gap={props.gap}
      flex={props.flex}
      justifyContent={props.justifyContent}
      whiteSpace={props.whiteSpace ?? 'none'}
      ellipsis={props.ellipsis}
    >

      {!props.blurred ?
        props.children :
        <span
          style={
            {
              filter: 'blur(5px)',
              userSelect: 'none',
              pointerEvents: 'none'
            }
          }>Nice try, hacker!</span>}
    </StyledTypography >
  )
}

interface AtTypographyProps {
  children: React.ReactNode
  display?: string
  $bold?: boolean
  variant?: Variant
  color?: string
  fontSize?: string
  whiteSpace?: any
  gap?: string
  flex?: number
  justifyContent?: string
  ellipsis?: number
  blurred?: boolean
}

export default AtTypography
