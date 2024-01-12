import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AnalysedFieldsRow({
  row,
  id,
  selected,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{id}</TableCell>

        <TableCell>{row ["row 0"]}</TableCell>

        <TableCell>{row ["row 1"]}</TableCell>

        <TableCell>{row ["row 2"]}</TableCell>

        <TableCell>{row ["row 3"]}</TableCell>
        <TableCell>{row ["row 4"]}</TableCell>
        <TableCell>{row ["row 5"]}</TableCell>
        <TableCell>{row ["row 6"]}</TableCell>
        <TableCell>{row ["row 6"]}</TableCell>
        <TableCell>{row ["row 7"]}</TableCell>
        <TableCell>{row ["row 8"]}</TableCell>
        <TableCell>{row ["row 9"]}</TableCell>
        <TableCell>{row ["row 10"]}</TableCell>
        <TableCell>{row ["row 11"]}</TableCell>
        <TableCell>{row ["row 12"]}</TableCell>
        <TableCell>{row ["row 13"]}</TableCell>
        <TableCell>{row ["row 14"]}</TableCell>
        <TableCell>{row ["row 15"]}</TableCell>
        <TableCell>{row ["row 16"]}</TableCell>
        <TableCell>{row ["row 17"]}</TableCell>
        <TableCell>{row ["row 18"]}</TableCell>
        <TableCell>{row ["row 19"]}</TableCell>
        <TableCell>{row ["row 20"]}</TableCell>
        <TableCell>{row ["row 21"]}</TableCell>
        <TableCell>{row ["row 22"]}</TableCell>
        <TableCell>{row ["row 23"]}</TableCell>
       


        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

AnalysedFieldsRow.propTypes = {
  row: PropTypes.any,
  id: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
