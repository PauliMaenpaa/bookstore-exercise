import React from "react";
import { useState } from 'react';
import { Button, TextField } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function AddBook(props) {

  const [open, setOpen] = useState(false)
  const [book, setBook] = useState({title: '', author: '', year: '', isbn: '', price: '' });

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    console.log("handle save")
    props.addBook(book);
    handleClose();
  }

  const inputChanged = (e) => {
    setBook({...book, [e.target.name]: e.target.value})
  } 

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="success" size="small" style={{marginBottom: '1rem'}}>Add Book</Button>
      <Dialog open={open}>
        <DialogTitle>New book</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill the fields to add a new book</DialogContentText>
          <TextField
            name="title"
            variant="standard"
            value={book.title}
            onChange={inputChanged}
            margin="dense"
            label="Title"
            fullWidth
          />
          <TextField
            name="author"
            variant="standard"
            value={book.author}
            onChange={inputChanged}
            margin="dense"
            label="Author"
            fullWidth
          />
          <TextField
            name="year"
            variant="standard"
            value={book.year}
            onChange={inputChanged}
            margin="dense"
            label="Year"
            fullWidth
          />
          <TextField
            name="isbn"
            variant="standard"
            value={book.isbn}
            onChange={inputChanged}
            margin="dense"
            label="Isbn"
            fullWidth
          />
          <TextField
            name="price"
            variant="standard"
            value={book.price}
            onChange={inputChanged}
            margin="dense"
            label="Price"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddBook;