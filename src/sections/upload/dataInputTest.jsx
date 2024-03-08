import PropTypes from 'prop-types';
import {  useState, useEffect } from 'react';

import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

SimpleListMenu.propTypes = {
  setSelectedFactory: PropTypes.func,
};

export default function SimpleListMenu({setSelectedFactory}) {
    
  const [anchorEl, setAnchorEl] = useState(null);
  const [dataOptions, setAllDataPages] = useState([]);

  const open = Boolean(anchorEl);

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

  const [selectedIndex, setSelectedIndex] = useState();
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedFactory(dataOptions[index])
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
        >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          >
          <ListItemText
            primary="Choose your Data"
            secondary={dataOptions[selectedIndex]}
            />
        </ListItemButton>
      </List>
      
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
        >
        {dataOptions.map((option, index) => (
          <MenuItem
          key={option}
          selected={index === selectedIndex}
          onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}