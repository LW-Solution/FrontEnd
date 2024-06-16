import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GridDataType, DailyData, Measurement } from '../../types/dashTypes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3A415A",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface TableParamsProps {
  gridData: GridDataType | null;
}

const TableParams: React.FC<TableParamsProps> = ({ gridData }) => {
  // Extraindo cabeçalhos únicos das descrições dos parâmetros
  const parameterHeaders = React.useMemo(() => {
    const headers = new Set<string>();
    gridData?.dailyData.forEach((dailyData: DailyData) =>
      dailyData.measurements.forEach((measurement: Measurement) => headers.add(measurement.description))
    );
    return Array.from(headers);
  }, [gridData]);

  const formatDatePtBr = (dateString: string) => {
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }
    return dateString; // Retornar o valor original se o formato não estiver correto
  };


  // Agrupando medições pelo unixtime
  const groupedData = React.useMemo(() => {
    if (!gridData) return [];
    const dataMap = new Map<number, { date: string, measurements: { [key: string]: number } }>();

    gridData.dailyData.forEach((dailyData: DailyData) => {
      dailyData.measurements.forEach((measurement: Measurement) => {
        if (!dataMap.has(measurement.unixtime)) {
          dataMap.set(measurement.unixtime, { date: dailyData.date, measurements: {} });
        }
        dataMap.get(measurement.unixtime)!.measurements[measurement.description] = measurement.value;
      });
    });

    return Array.from(dataMap.entries()).map(([unixtime, data]) => ({
      unixtime,
      date: data.date,
      measurements: data.measurements,
    }));
  }, [gridData]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Data</StyledTableCell>
            <StyledTableCell>Hora</StyledTableCell>
            {parameterHeaders.map((header) => (
              <StyledTableCell key={header} align="right">
                {header} ({gridData?.parameterUnits[header]})
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedData.map((data) => (
            <StyledTableRow key={data.unixtime}>
              <StyledTableCell component="th" scope="row">
                {formatDatePtBr(data.date)}
              </StyledTableCell>
              <StyledTableCell>{new Date(data.unixtime * 1000).toLocaleTimeString()}</StyledTableCell>
              {parameterHeaders.map((header) => (
                <StyledTableCell key={header} align="right">
                  {data.measurements[header] !== undefined ? data.measurements[header] : 'N/A'}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableParams;
