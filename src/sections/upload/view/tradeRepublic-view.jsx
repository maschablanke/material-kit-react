import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { tradeRepublic } from 'src/_mock/tradeRepublic';
import Scrollbar from 'src/components/scrollbar';

import DataInput from '../dataInput';
import SimpleListMenu from '../dataInputTest';
// import UploadFile from '../uploadButton';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import TradeRepublicTableRow from '../tradeRepublic-table-row';
import TradeRepublicTableHead from '../tradeRepublic-table-head';
import { emptyRows, applyFilter, getComparator } from '../utils';
import TradeRepublicTableToolbar from '../tradeRepublic-table-toolbar';

// ----------------------------------------------------------------------

export default function TradeRepublicPage() {
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

  // selected wirklih alles, nicht nur die cols die auf der seite angezeigt werden
  // FRAGE: kan man das ändern bzw sollte das anders sein
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = newData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  // liste von allen spalten aus der Tabelle data
  const allCols = (data) =>
    data.flatMap(x => Object.keys(x)).filter((value, index, array) => array.indexOf(value) === index)


  // seite von der die daten gerade kommen
  // zieht die aktuellen daten aus dem netz von den unterschiedlichen seiten
  const [newData, setNewData] = useState([]); 

  // aus dem drop down menu ausgewählte seite
  // FRAGE: Why wird das in einem array gspeichert, muss das?
  const [selectedFactory, setSelectedFactory] = useState('wikipedia.factory')
  
  useEffect(() => {
    // url die gelesen wird (concat conectet die urls)
    fetch('http://127.0.0.1:8080/config?factoryId='.concat(selectedFactory))
    // ist ne json datei
    .then((response) => response.json())
    // nimm die daten die(momentan noch) im data.config.baseUrls array stehen
    .then((data) => {
      console.log(data);
      console.log(selectedFactory);
      setNewData(data.config.infos.fields);
    })
    // exeption
    .catch((err) => {
      console.log(err.message);
    });
  }, [selectedFactory]);
  
  
  // zieht die überschrift für die zeilen aus den ausgewählten daten
  const showCols = allCols(newData)
  console.log(showCols)
  console.log(showCols.length)

  const dataFiltered = applyFilter({
    //  inputData: tradeRepublic,
    inputData: newData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  
  const notFound = !dataFiltered.length && !!filterName;

  
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">TradeRepublic</Typography>
      </Stack>

      <Card>
        <TradeRepublicTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          />

          {/* Erste dropdown tabelle */}
        <DataInput />

          {/* dropdown tabelle die funktioniert */}
        {selectedFactory}
        <SimpleListMenu setSelectedFactory={setSelectedFactory}/>
        
        
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TradeRepublicTableHead
                order={order}
                orderBy={orderBy}
                rowCount={newData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={
                  [...Array(showCols.length +1).keys()].map((col, i) => (
                    { id: i, label: showCols[i] }
                    ))} />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TradeRepublicTableRow
                    showCols={showCols}
                    key={i}
                    row={row}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(event) => handleClick(event, row.id)}
                    />
                    ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, newData.length)}
                  />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={newData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Card>
    </Container>
  );
}
