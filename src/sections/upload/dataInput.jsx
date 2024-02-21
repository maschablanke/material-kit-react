import { useState, useEffect } from 'react';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function DataInput() {

  const [open, setOpen] = useState(null);

  const [DATA_OPTIONS, setAllDataPages] = useState([]);

  useEffect(() => {
    // url die gelesen wird
    fetch('http://localhost:8080/factoryIds')
      // ist ne json datei
      .then((response) => response.json())
      // nimm die daten die(momentan noch) im data.config.baseUrls array stehen
      .then((data) => {
        console.log(data);
        setAllDataPages(data);
      })
      // exeption
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {

    setOpen(null);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Choose Data:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Ausgewählte Seite 
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0,
              },
            },
          },
        }}
      >
        {DATA_OPTIONS.map((option, i) => (
          <MenuItem key={i} selected={option.value === 'newest'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
