import React from 'react'
import styled, { css } from 'styled-components'
import { black, grey2, grey5, white } from '../../utils/colors'
import AtTypography from '../AtTypography/AtTypography'

const StyledTab = styled.div<{ $active?: boolean; $width?: string }>`
  border: 1px solid ${grey5};
  transition: 0.3s;
  ${({ $active }) =>
    $active
      ? css`
            background-color ${black};
            color: ${white};
        `
      : css`
            background-color ${grey5};
            
            &:hover {
                cursor: pointer;
                transition: .3s;
                border-color: ${grey2};
            }
        `}
  border-radius: 5px;
  width: ${({ $width }) => $width};
  padding: 10px 20px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`

const StyledBadge = styled.div<{ $active?: boolean }>`
  background-color: ${({ $active }) => ($active ? white : black)};
  color: ${({ $active }) => ($active ? black : white)};
  border-radius: 5px;
  padding: 3px 5px 1px 5px;
  font-size: 10px;
`

const StyledTypography = styled(AtTypography)`
  white-space: nowrap;
  @media (max-width: 1420px) {
    font-size: 0.9vw;
  }
`

const AtTab: React.FunctionComponent<AtTabProps> = (props: AtTabProps) => {
  return (
    <StyledTab
      $active={props.$active}
      onClick={props.onClick}
      $width={props.width}
    >
      <StyledTypography>{props.label}</StyledTypography>
      {props.badge !== undefined && props.badge >= 0 && (
        <StyledBadge $active={props.$active}>
          <AtTypography fontSize={'10px'}>{props.badge}</AtTypography>
        </StyledBadge>
      )}
    </StyledTab>
  )
}

interface AtTabProps {
  label: string
  badge?: number
  $active?: boolean
  onClick?: () => void
  width?: string
}

export default AtTab
