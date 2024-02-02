import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AnalyticsTasks({ title, subheader, list, ...other }) {
  // Zustand selected erstellt, der ein Array von tasks. Anfangszustand ist ein Array mit Element ('2').
  // Aufgabe mit der ID '2' standardmäßig als ausgewählt betrachtet wird.
  const [selected, setSelected] = useState(['2']);

  // taskId als Parameter, aktualisiert Zustand selected -> Klick & speichert die ausgewählten Aufgaben
  const handleClickComplete = (taskId) => {
    // task id schon selected?
    const tasksCompleted = selected.includes(taskId)
      // ja, dann aus array removen
      ? selected.filter((value) => value !== taskId)
      // nein, array geadded
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {/* map-Funktion wird verwendet, um für jede Aufgabe in der list ein TaskItem zu erstellen */}
      {list.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={selected.includes(task.id)}
          onChange={() => handleClickComplete(task.id)}
        />
      ))}
    </Card>
  );
}

AnalyticsTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onChange }) {
  // lokale Zustand open mit der useState-Hook
  const [open, setOpen] = useState(null);

  // aufgerufen, wenn das Menü geöffnet werden soll
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  // aufgerufen, wenn das Menü geschlossen werden soll. Zustand 'open' auf 'null'
  const handleCloseMenu = () => {
    setOpen(null);
  };
  
  const handleMarkComplete = () => {
    handleCloseMenu();
    console.info('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.info('SHARE', task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.info('EDIT', task.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.info('DELETE', task.id);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          // Dieses Attribut spezifiziert das Steuerelement, das mit dem Etikett verknüpft werden soll(checkbox)
          // checked = ausgewählt oder need 
          // on change = Funktion, die aufgerufen wird, wenn sich der Zustand der Checkbox ändert
          control={<Checkbox checked={checked} onChange={onChange} />}

          // Das ist der Text, der als Etikett neben dem Steuerelement angezeigt wird.
          // In diesem Fall ist es der Name der Aufgabe (task.name)
          label={task.name}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <Popover
        // Das Menü wird geöffnet, wenn der Zustand open nicht null ist.
        open={!!open}
        // Das Element, an dem das Menü verankert ist.
        anchorEl={open}
        // Die Funktion handleCloseMenu wird aufgerufen, wenn das Menü geschlossen
        onClose={handleCloseMenu}
        // Steuern die Position des Popovers relativ zum Ankerpunkt.
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" sx={{ mr: 2 }} />
          Share
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
};
