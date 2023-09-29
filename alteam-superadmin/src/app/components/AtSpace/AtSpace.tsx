import React from 'react'
import styled, { css } from 'styled-components'

const StyledSpace = styled.div<AtSpaceProps>`
  ${({ direction, spacing }) =>
    direction === 'vertical'
      ? css`
          height: ${spacing}px;
        `
      : css`
          width: ${spacing}px;
        `}
`

const AtSpace: React.FunctionComponent<AtSpaceProps> = (
  props: AtSpaceProps,
) => {
  return <StyledSpace {...props} />
}

export default AtSpace

interface AtSpaceProps {
  direction: 'vertical' | 'horizontal'
  spacing: string
}
