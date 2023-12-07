import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AppBar, Toolbar, Typography } from '@mui/material'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBook from './AddBook';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './App.css'

function App() {

  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    fetch('https://bookstore-68599-default-rtdb.europe-west1.firebasedatabase.app/books.json')
      .then(response => response.json())
      .then(data => addKeys(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const columns = [
    { field: 'title', sortable: true, filter: true, resizable: false },
    { field: 'author', sortable: true, filter: true, resizable: false },
    { field: 'year', sortable: true, filter: true, resizable: false },
    { field: 'isbn', sortable: true, filter: true, resizable: false },
    { field: 'price', sortable: true, filter: true, resizable: false },
    { field: '', 
    sortable: true, 
    filter: true, 
    resizable: false,
    cellRenderer: params => <IconButton onClick={() => deleteBook(params.data.id)} color='error' size='small'> <DeleteIcon/> </IconButton> }
  ];

  const addNewBook = (newBook) => {
    fetch('https://bookstore-68599-default-rtdb.europe-west1.firebasedatabase.app/books.json',
    {
      method: 'POST',
      body: JSON.stringify(newBook)
    })
    .then(response => response.json())
    .then(() => fetchBooks())
    .catch(err => console.error(err))
  }

  const deleteBook = (id) => {
    fetch(`https://bookstore-68599-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(response => fetchBooks())
    .catch(err => console.error(err))
  }

  const addKeys = (data) => { 
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
      Object.defineProperty(item, 'id', {value: keys[index]}));
    setBooks(valueKeys);  
  }

  return (
    <>
    <AddBook addBook={addNewBook}/>
    <AppBar position='static' color="primary">
      <Toolbar>
        <Typography>
          Bookstore
        </Typography>
      </Toolbar>
    </AppBar>
      <AgGridReact
        rowData={books}
        columnDefs={columns}
        domLayout='autoHeight'
        className='ag-theme-alpine-dark'
      />
    
    </>
  )
}

export default App;
