import { Skeleton, styled, TableRow, TableRowProps } from '@mui/material';
import React from 'react';
import AtTableCell from './AtTableCell';

const StyledTableRow = styled(TableRow)`
  min-height: 35px;
  width: 100%;
`;

export const AtTableRow: React.FunctionComponent<TableRowProps> = (props) => {
  return <StyledTableRow {...props} />;
};

export const AtTableLoadingRow: React.FunctionComponent<
  AtTableLoadingRowProps
> = (props: AtTableLoadingRowProps) => {
  return (
    <StyledTableRow>
      <AtTableCell width={'100%'} colSpan={props.numberColumns}>
        <Skeleton style={{ width: '100%' }} />
      </AtTableCell>
    </StyledTableRow>
  );
};

interface AtTableLoadingRowProps {
  numberColumns: number;
}
