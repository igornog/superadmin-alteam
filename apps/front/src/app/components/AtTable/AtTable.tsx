import {
  Box,
  Table,
  TableContainer,
  TableProps,
  tableRowClasses,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { green, white } from '../../utils/colors';
import { boxShadow } from '../../utils/theme';

const StyledBackground = styled(Box)`
  background-color: ${white};
  height: calc(100% + 10px);
  border-radius: 10px;
  overflow: visible;
  padding: 4px 20px 0 20px;
  width: 100%;
  box-sizing: border-box;
  z-index: -2;
`;

const StyledTable = styled(Table)<AtTableProps>`
  background-color: ${white};
  border-radius: 10px;

  .${tableRowClasses.hover}:hover {
    position: relative;
    cursor: pointer;
    background-color ${white};
    z-index: 0;

    &:after {
      position: absolute;
      content: '';
      display: inline-block;
      z-index: -1;
      width: calc(100% + 24px);
      height: 100%;
      top: 0;
      left: -12px;
      border-radius: 5px;
      border: 1px solid ${green};
      box-shadow: ${boxShadow};
    }
  }
`;

const AtTable: React.FunctionComponent<TableProps & AtTableProps> = (props) => {
  return (
    <TableContainer component={StyledBackground}>
      <StyledTable {...props} />
    </TableContainer>
  );
};

interface AtTableProps {
  disabled?: boolean;
  hover?: boolean;
}

export default AtTable;
