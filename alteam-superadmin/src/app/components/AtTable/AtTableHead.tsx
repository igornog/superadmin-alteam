import { tableCellClasses, TableHead, TableHeadProps } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { grey2 } from '../../utils/colors'

const StyledTableHead = styled(TableHead)`
  .${tableCellClasses.root} {
    color: ${grey2};
    padding-bottom: 14px;
  }
`

const AtTableHead: React.FunctionComponent<TableHeadProps> = (props) => {
  return <StyledTableHead {...props} />
}

export default AtTableHead
