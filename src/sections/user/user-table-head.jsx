import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from './utils';

// ----------------------------------------------------------------------

export default function UserTableHead({
  // Die Sortierreihenfolge ('asc' für aufsteigend, 'desc' für absteigend)
  order,
  //  Die Spalte, nach der sortiert wird
  orderBy,
  // Die Gesamtanzahl der Zeilen in der Tabelle
  rowCount,
  // Ein Array von Objekten, das die Konfiguration der Kopfzeile enthält.
  headLabel,
  // Die Anzahl der ausgewählten Zeilen
  numSelected,
  // Funktion, die aufgerufen wird, wenn eine Sortierungsanforderung erfolgt
  onRequestSort,
  // Funktion, die aufgerufen wird, wenn alle Zeilen ausgewählt werden sollen
  onSelectAllClick,

}) {
  // nimmt property und gibt eine Funktion zurück, die onRequestSort mit event und property als Argumenten aufruft
  const onSort = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
           // Checkbox für select all
            // Gibt an, ob das Kontrollkästchen in einem unbestimmten Zustand ist
            indeterminate={numSelected > 0 && numSelected < rowCount}
            // Gibt an, ob das Kontrollkästchen vollständig ausgewählt ist
            checked={rowCount > 0 && numSelected === rowCount}
            // Wird aufgerufen, wenn sich der Auswahlstatus ändert
            onChange={onSelectAllClick}
          />
        </TableCell>

        {headLabel.map((headCell) => (
          <TableCell
            // jeden element braucht einen Key
            key={headCell.id}
            align={headCell.align || 'left'}
            //  Gibt die Sortierrichtung der Spalte an ('asc', 'desc' oder false, wenn nicht sortiert
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              // Gibt an, ob die Spalte aktiv sortiert ist
              active={orderBy === headCell.id}
              // Gibt die aktuelle Sortierrichtung an ('asc', 'desc' oder 'asc' als Standard, wenn nicht sortiert
              direction={orderBy === headCell.id ? order : 'asc'}
              // Ruft die onSort-Funktion mit dem headCell.id auf, wenn auf den Spaltenkopf geklickt wird
              onClick={onSort(headCell.id)}
            >
              {headCell.label}
              {/* überprüft, ob die aktuelle Spalte sortiert ist. 
              Wenn ja, wird ein visuell versteckter Text mit der aktuellen Sortierrichtung angezeigt */}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};
