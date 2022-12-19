import {
  Skeleton,
  TableRow,
  tableRowClasses,
  TableRowProps,
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import AtTableCell from './AtTableCell'

const StyledTableRow = styled(TableRow)`
  min-height: 35px;
  width: 100%;
  position: relative;
  white-space: nowrap;

  &.${tableRowClasses.hover}:hover {
    {
    background-color: transparent;
    cursor: pointer;
    z-index: 0;
  }
`

export const AtTableRow: React.FunctionComponent<AtTableRowProps> = (
  props: AtTableRowProps,
) => {
  return (
    <StyledTableRow
      {...props}
      onMouseEnter={(e) => {
        props.$setPosition && props.$setPosition(e.currentTarget.offsetTop)
      }}
      onMouseLeave={() => props.$setPosition && props.$setPosition(null)}
    />
  )
}

export const AtTableLoadingRow: React.FunctionComponent<
  AtTableLoadingRowProps
> = (props: AtTableLoadingRowProps) => {
  return (
    <StyledTableRow>
      <AtTableCell width={'100%'} colSpan={props.numberColumns}>
        <Skeleton style={{ width: '100%' }} />
      </AtTableCell>
    </StyledTableRow>
  )
}

interface AtTableRowProps extends TableRowProps {
  $hover?: boolean
  $setPosition?: React.Dispatch<React.SetStateAction<number | null>>
}

interface AtTableLoadingRowProps {
  numberColumns: number
}
