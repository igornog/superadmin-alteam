import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  tableCellClasses,
  Box,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { grey2, white } from '../../utils/colors';
import AtTable from './AtTable';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const AtTableFull: React.FunctionComponent = () => {
  return (
    <AtTable>
      <TableHead>
        <TableRow>
          <TableCell>Talent</TableCell>
          <TableCell>Applied</TableCell>
          <TableCell>Availability</TableCell>
          <TableCell align="right">Skills</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            hover={true}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell>{row.calories}</TableCell>
            <TableCell>{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </AtTable>
  );
};

export default AtTableFull;
