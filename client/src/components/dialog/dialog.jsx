import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import Axios from 'axios';

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    price: props.price,
    category: props.category,
  });

  const handleEditGame = () => {
    Axios.put('http://localhost:3001/edit', {
      id: editValues.id,
      name: editValues.name,
      price: editValues.price,
      category: editValues.category,
    })
    handleClose();
  }
 
  const handleDeleteGame = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
    handleClose();
  }

  const handleClickOpen = () => props.setOpen(true);

  const handleClose = () => props.setOpen(false);

  const handleChangeValues = (value) => {
    setEditValues(prevValues => ({
      ...prevValues, 
      [value.target.id]: value.target.value,
    }))
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Game's name"
          defaultValue={props.name}
          onChange={handleChangeValues}
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Price"
          defaultValue={props.price}
          onChange={handleChangeValues}
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="category"
          label="Category"
          defaultValue={props.category}
          onChange={handleChangeValues}
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteGame} color="primary">
          Delete
        </Button>
        <Button onClick={handleEditGame} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}