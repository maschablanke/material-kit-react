import  useState  from 'react';

import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItemText from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ListItemButton from '@mui/material/ListItemButton';

// ----------------------------------------------------------------------

export default function DataInput() {

  // const [open, setOpen] = useState(null); 

  const open = Boolean(anchorEl);

  // const [dataOptions, setAllDataPages] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(1);

  const dataOptions = [
    'Show some love to MUI',
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content',
  ];
  // useEffect(() => {
  //   // url die gelesen wird
  //   fetch('http://localhost:8080/factoryIds')
  //     // ist ne json datei
  //     .then((response) => response.json())
  //     // nimm die daten die(momentan noch) im data.config.baseUrls array stehen
  //     .then((data) => {
  //       console.log(data);
  //       setAllDataPages(data);
  //     })
  //     // exeption
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  // const handleOpen = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleOption = (options) => {
  //   console.log(options)
  // };

  // const handleClose = () => {
  //   setOpen(null);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  return (
    <>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Choose your Data"
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
        {dataOptions.map((options, index) => (
          <MenuItem
            key={options}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {options}
          </MenuItem>
        ))}
      </Menu>
      </>
  );
}



//   return (
//     <>
//       <Button
//         disableRipple
//         color="inherit"
//         onClick={handleOpen}
//         endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
//       >
//         Choose Data:&nbsp;
//         <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
//           Ausgewählte Seite 
//         </Typography>
//       </Button>

//       <Menu
//         open={!!open}
//         anchorEl={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         slotProps={{
//           paper: {
//             sx: {
//               [`& .${listClasses.root}`]: {
//                 p: 0,
//               },
//             },
//           },
//         }}
//         >
//         {dataOptions.map((options, i) => (
//           <MenuItem key={i} selected={options.value === 'newest'} onClick={handleClose}>
//             {options}
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// }