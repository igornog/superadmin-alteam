import React from 'react'
import styled, { css } from 'styled-components'
import { black, green, white } from '../../utils/colors'
import AtTypography from '../AtTypography/AtTypography'

const StyledGroupTag = styled.div<{ icon?: React.ReactNode }>`
  background-color: ${black};
  border-radius: 5px;
  color: ${white};
  width: fit-content;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;

  & > p {
    font-size: 10px;
  }

  ${({ icon }) =>
    icon &&
    css`
        min-height: 20px;
        padding: 0;
        background-color ${green};
        color: ${black};
    `}
`

const AtGroupTag: React.FunctionComponent<AtGroupTagProps> = (
  props: AtGroupTagProps,
) => {
  return (
    <StyledGroupTag icon={props.icon}>
      {props.label ? <AtTypography>{props.label}</AtTypography> : props.icon}
    </StyledGroupTag>
  )
}

interface AtGroupTagProps {
  label?: string
  icon?: React.ReactNode
}

export default AtGroupTag
