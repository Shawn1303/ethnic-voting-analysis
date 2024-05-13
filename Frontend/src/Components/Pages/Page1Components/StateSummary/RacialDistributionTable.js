import * as React from 'react';
import { styled } from '@mui/system';
import { TableCell, TableRow } from '@mui/material';
export default function RacialDistributionTable(props) {

const raceFormatter = (key) => {
  const raceMap = {
    registered_voters_european: 'White',
    registered_voters_south_east_asian: 'Asian',
    registered_voters_african_american: 'Black/African American',
    registered_voters_hispanic: 'Hispanic/Latino',
    registered_voters_other: 'Other',
    registered_voters_total: 'Total'
  };
  return raceMap[key];
};

const columns = [
  { id: 'race', label: 'Race/Ethnicity', minWidth: 50, format: raceFormatter},
  { id: 'population', label: 'Population', minWidth: 60, align: 'right',
      format: (value) => Intl.NumberFormat('en-US', { style: 'decimal' }).format(value)},
];

  return (
    <Root sx={{ width: '100%'}}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
                <TableCell
                    key={column.id}
                >
                <b>{column.label}</b>
                </TableCell>
            ))}
          </tr>
        </thead>
        <tbody>
            {Object.entries(props.stateSummary[0][0]).map(([key, value]) => {
                return (
                  value > 0 && (
                  <TableRow key={key}>
                    <TableCell>{raceFormatter(key)}</TableCell>
                    <TableCell align='right'>
                      {columns.find(col => col.id === 'population').format(value)}
                    </TableCell>
                  </TableRow>
                ));
            })}
        </tbody>
      </table>
    </Root>
  );
}

const blue = {
  50: '#F0F7FF',
  200: '#A5D8FF',
  400: '#3399FF',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  border-radius: 12px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  overflow: clip;

  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    border: none;
    margin: -1px;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    padding: 8px;
  }

  `,
);

