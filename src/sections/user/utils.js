export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// absteigende Sortierung
function descendingComparator(a, b, orderBy) {
  // Überprüfe, ob das Attribut orderBy im ersten Element (a) null ist
  // Setze a weiter nach unten, wenn es null ist
  if (a[orderBy] === null) {
    return 1;
  }
  // Überprüfe, ob das Attribut orderBy im zweiten Element (b) null ist
  if (b[orderBy] === null) {
    // Setze b weiter nach unten, wenn es null ist
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    // Setze b nach oben, wenn es kleiner ist
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    // Setze a nach oben, wenn es kleiner ist
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  // Wenn die Sortierreihenfolge 'desc' ist,
  return order === 'desc'
    // dann verwende die descendingComparator-Funktion.
    ? (a, b) => descendingComparator(a, b, orderBy)
    // Andernfalls verwende die umgekehrte descendingComparator-Funktion.
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({ inputData, comparator, filterName }) {
  // Erstelle ein neues Array mit Paaren aus Elementen und ihren ursprünglichen Indizes
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  // Sortiere das Array basierend auf dem Comparator
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  // Extrahiere die ursprünglichen Indizes in die sortierte Reihenfolge
  inputData = stabilizedThis.map((el) => el[0]);

  // Wenn ein Filtername angegeben ist, filtere die Daten
  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
