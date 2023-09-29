import { TableCell, TableCellProps } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const StyledTableCell = styled(TableCell)`
  padding: 16px 20px;
  border-bottom: none;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`

const AtTableCell: React.FunctionComponent<TableCellProps> = (props) => {
  return <StyledTableCell {...props} />
}

export default AtTableCell
