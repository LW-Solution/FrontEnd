// src/components/PortalTableParams.tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NewGridDataType, DailyDataEntry, AvgParameterValues } from '../../types/groupHour';

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
  gridData: NewGridDataType | null;
}

const PortalTableParams: React.FC<TableParamsProps> = ({ gridData }) => {
  // Extraindo cabeçalhos únicos das descrições dos parâmetros
  const parameterHeaders = React.useMemo(() => {
    const headers = new Set<string>();
    gridData?.parameter_types.forEach((parameter) => headers.add(parameter.description));
    return Array.from(headers);
  }, [gridData]);

  // Agrupando medições por data e hora
  const groupedData = React.useMemo(() => {
    if (!gridData) return [];
    const dataMap = new Map<string, { date: string, hour: string, measurements: { [key: string]: AvgParameterValues } }>();

    gridData.dailyData.forEach((dailyData: DailyDataEntry) => {
      const key = `${dailyData.date}-${dailyData.hour}`;
      if (!dataMap.has(key)) {
        dataMap.set(key, { date: dailyData.date, hour: dailyData.hour, measurements: {} });
      }
      Object.entries(dailyData.avgParameterValues).forEach(([description, values]) => {
        dataMap.get(key)!.measurements[description] = values;
      });
    });

    return Array.from(dataMap.entries()).map(([key, data]) => ({
      date: data.date,
      hour: data.hour,
      measurements: data.measurements,
    }));
  }, [gridData]);

  // Função para formatar a data para o padrão PT-BR
  const formatDatePtBr = (dateString: string) => {
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }
    return dateString; // Retornar o valor original se o formato não estiver correto
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Data</StyledTableCell>
            <StyledTableCell>Hora</StyledTableCell>
            {parameterHeaders.map((header) => (
              <StyledTableCell key={header} align="right">
                {header} ({gridData?.parameter_types.find(pt => pt.description === header)?.unit.unit})
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedData.map((data, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {formatDatePtBr(data.date)}
              </StyledTableCell>
              <StyledTableCell>{data.hour}</StyledTableCell>
              {parameterHeaders.map((header) => (
                <StyledTableCell key={header} align="right">
                  {data.measurements[header] !== undefined ? data.measurements[header].avgValue : 'N/A'}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PortalTableParams;
