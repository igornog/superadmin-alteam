import React from 'react'
import styled, { css } from 'styled-components'
import { black, blue, green, red, white, yellow } from '../../utils/colors'
import AtTypography from '../Typography/Typography'
import { ListingStatus } from '@yjcapp/app'

const StyledStatusTag = styled.div<{
  icon?: React.ReactNode
  fontSize?: string
  status?: string
}>`
  background-color: ${black};
  border-radius: 5px;
  color: ${white};
  width: fit-content;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: fit-content;

  & > p {
    font-size: ${({ fontSize }) => fontSize ?? '10px'};
  }

  ${({ icon }) =>
    icon &&
    css`
        min-height: 20px;
        padding: 0;
        background-color ${green};
        color: ${black};
    `}

    ${({ status }) =>
    status === ListingStatus.Active
      ? css`
          background-color: ${green};
          p {
            color: ${black};
          }
        `: status === ListingStatus.Running
        ? css`
          background-color: ${yellow};
          p {
            color: ${black};
          }
        `: status === ListingStatus.Disabled
          ? css`
          background-color: ${red};
          p {
            color: ${white};
          }
          `: status === ListingStatus.Ended
            ? css`
        background-color: ${blue};
        p {
          color: ${white};
        }
        ` : css`
            background-color: transparent;
            p {
              color: ${black};
            }`} 
  }

`

const AtStatusTag: React.FunctionComponent<AtStatusTagProps> = (
  props: AtStatusTagProps,
) => {
  return (
    <StyledStatusTag icon={props.icon} fontSize={props.fontSize} status={props.status}>
      {props.label ? <AtTypography>{props.label}</AtTypography> : props.icon}
    </StyledStatusTag>
  )
}

interface AtStatusTagProps {
  label?: string
  icon?: React.ReactNode
  fontSize?: string
  status?: string
}

export default AtStatusTag

