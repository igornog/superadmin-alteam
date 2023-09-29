import styled, { css } from 'styled-components'
import { grey5 } from '../../utils/colors'

const StyledLine = styled.div<AtLineProps>`
  ${({ direction }) =>
    direction === 'vertical'
      ? css<AtLineProps>`
          height: 100%;
          width: ${({ size }) => (size ? size : 1)}px;
        `
      : css<AtLineProps>`
          height: ${({ size }) => (size ? size : 1)}px;
          width: 100%;
        `}

  background-color: ${({ color }) => (color ? color : grey5)};
  opacity: ${({ opacity }) => (opacity ? opacity : 1)};
  margin: ${({ spacing }) => (spacing ? `${spacing}px` : '')} 0;
  margin-top: ${({ spacingTop }) => (spacingTop ? `${spacingTop}px` : '')};
  margin-bottom: ${({ spacingBottom }) =>
    spacingBottom ? `${spacingBottom}px` : ''};
`

const AtLine: React.FunctionComponent<AtLineProps> = (props: AtLineProps) => {
  return (
    <StyledLine
      color={props.color}
      opacity={props.opacity}
      spacing={props.spacing}
      spacingBottom={props.spacingBottom}
      spacingTop={props.spacingTop}
      size={props.size}
      direction={props.direction}
    >
      &nbsp;
    </StyledLine>
  )
}

interface AtLineProps {
  color?: string
  opacity?: number
  spacing?: number
  spacingBottom?: number
  spacingTop?: number
  size?: number
  direction?: 'vertical' | 'horizontal'
}

export default AtLine
