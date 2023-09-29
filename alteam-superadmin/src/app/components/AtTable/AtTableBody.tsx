import { TableBody, TableBodyProps } from '@mui/material'
import React from 'react'
import styled, { css } from 'styled-components'
import { green } from '../../utils/colors'
import { boxShadow } from '../../utils/theme'

const StyledTableBody = styled(TableBody)`
  position: relative;
`

const StyledHover = styled.div<{ positionTop: number | null }>`
  ${({ positionTop }) =>
    positionTop !== null &&
    css<{ positionTop: number | null }>`
      position: absolute;
      content: '';
      display: inline-block;

      width: calc(100% + 24px);
      transition: top 0.3s;
      height: 75px;
      top: ${({ positionTop }) => positionTop && positionTop + 'px'};
      left: -12px;
      border-radius: 5px;
      border: 1px solid ${green};
      box-shadow: ${boxShadow};
    `}
`

const AtTableBody: React.FunctionComponent<AtTableBodyProps> = (
  props: AtTableBodyProps,
) => {
  return (
    <StyledTableBody {...props}>
      <StyledHover positionTop={props.position} />
      {props.children}
    </StyledTableBody>
  )
}

interface AtTableBodyProps extends TableBodyProps {
  position: number | null
}

export default AtTableBody
