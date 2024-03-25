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

  const handleSort = (event, i) => {
    const isAsc = orderBy === i && order === 'asc';
    if (i !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(i);
    }
  };

  // console.log('selected View', selected);
  // console.log('selectedID', selected.id);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = analysedFields.map((n) => n.id);
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
      console.log('id vom ausgewählten element', newSelected)
  };

  const handleDelete = (event , i ) => {
    //  das element das entfehrnt werden soll
    const currentElement = dataFiltered[i];
    console.log('currentElement', currentElement);
    // index des elements...
    const currrentIndex = dataFiltered.indexOf(currentElement);
    console.log('currentIndex', currrentIndex);
    console.log('dataFiltered', dataFiltered);
    // ..., das aus dem array data filtered entfehrnt wird 
    const deletedElement = dataFiltered.splice(currrentIndex, 1);
    console.log('deletedElement', deletedElement );
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

  // console.log('dataFiltered',dataFiltered);

  const notFound = !dataFiltered.length && !!filterName;

  // kommt von KI, nicht vrändern!
  const showCols = ["id", "row 1", "row 3", "row 5", "row 17"];
  
  // kommt von KI, nicht vrändern!
  const headLineCols = ["id", "date", "adress", "company", "name"];

  const headline = [...Array(showCols.length+1).keys()].map((col, i) => (
    { id: showCols[i], label: headLineCols[i] }
  ))

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
                headLabel={headline}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <AnalysedFieldsRow
                      dataFiltered={dataFiltered}
                      showCols={showCols}
                      key={i}
                      row={row}
                      selected={selected.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
                      handleDelete={(event) => handleDelete(event, i)}
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
