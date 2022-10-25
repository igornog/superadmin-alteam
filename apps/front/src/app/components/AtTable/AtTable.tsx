import {
  Table,
  tableCellClasses,
  TableProps,
  tableRowClasses,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { blue, grey2, white } from '../../utils/colors';
import { convertHexToRGBA } from '../../utils/helpers';

const StyledTable = styled(Table)<AtTableProps>`
  background-color: ${white};
  border-radius: 10px;

  .${tableRowClasses.head} {
    .${tableCellClasses.root} {
      color: ${grey2};
      padding-bottom: 30px;
    }
  }

  .${tableCellClasses.root} {
    border-bottom: none;
  }

  .${tableRowClasses.hover}:hover {
    cursor: pointer;
    background-color: ${convertHexToRGBA(blue, 0.05)};
  }
`;

const AtTable: React.FunctionComponent<TableProps & AtTableProps> = (props) => {
  return <StyledTable {...props} />;
};

interface AtTableProps {
  disabled?: boolean;
  hover?: boolean;
}

export default AtTable;
