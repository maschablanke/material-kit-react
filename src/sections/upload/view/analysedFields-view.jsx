import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { analysedFields } from 'src/_mock/analysedFields';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import AnalysedFieldsRow from '../analysedFields-table-row';
import { emptyRows, applyFilter, getComparator } from '../utils';
import AnalysedFieldsTableHead from '../analysedFields-table-head';
import AnalysedFieldsTableToolbar from '../analysedFields-table-toolbar';

// ----------------------------------------------------------------------

export default function AnalysedFieldsPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = analysedFields.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: analysedFields,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const showCols = ["row 0", "row 1", "row 2"];

  const headLineCols = ["id", "isin", "company", "name"];

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">AnalysedFields</Typography>
      </Stack>

      <Card>
        <AnalysedFieldsTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <AnalysedFieldsTableHead
                order={order}
                orderBy={orderBy}
                rowCount={analysedFields.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={
                  showCols.map((col, i) => (
                    { id: 'row 1', label: headLineCols[i] }
                    ))}
                // headLabel={[
                //   { id: 'id', label: headLineCols[0] },
                //   { id: 'row 0', label: '0' },
                //   { id: 'row 1', label: '1' },
                //   { id: 'row 2', label: '2' },
                //   { id: 'row 3', label: '3' },
                //   { id: 'row 4', label: '4' },
                //   { id: 'row 5', label: '5' },
                //   { id: 'row 6', label: '6' },
                //   { id: 'row 7', label: '7' },
                //   { id: 'row 8', label: '8' },
                //   { id: 'row 9', label: '9' },
                //   { id: 'row 10', label: '10' },
                //   { id: 'row 11', label: '11' },
                //   { id: 'row 12', label: '12' },
                //   { id: 'row 13', label: '13' },
                //   { id: 'row 14', label: '14' },
                //   { id: 'row 15', label: '15' },
                //   { id: 'row 16', label: '16' },
                //   { id: 'row 17', label: '17' },
                //   { id: 'row 18', label: '18' },
                //   { id: 'row 19', label: '19' },
                //   { id: 'row 20', label: '20' },
                //   { id: 'row 21', label: '21' },
                //   { id: 'row 22', label: '22' },
                //   { id: 'row 23', label: '23' },
                //   { id: '1'},
                // ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <AnalysedFieldsRow
                      showCols={showCols}
                      key={row.id}
                      id={row.id}
                      row={row}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, analysedFields.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={analysedFields.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
