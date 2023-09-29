import { Box, Table, TableContainer, TableProps } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { white } from '../../utils/colors'

const StyledBackground = styled(Box)`
  background-color: ${white};
  height: calc(100% + 10px);
  border-radius: 10px;
  overflow: visible;
  padding: 4px 20px;
  width: 100%;
  box-sizing: border-box;
  z-index: -2;
`

const AtTable: React.FunctionComponent<TableProps & AtTableProps> = (props) => {
  return (
    <TableContainer component={StyledBackground}>
      <Table {...props} />
    </TableContainer>
  )
}

interface AtTableProps {
  disabled?: boolean
  hover?: boolean
}

export default AtTable
