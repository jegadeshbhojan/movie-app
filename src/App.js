import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MovieApp } from './Movieapp';
import { useState } from 'react';
function App() {
  const [search,setSearchText]=useState('');

  const handleChange=(event)=>{
console.log(event.target.value);
setSearchText(event.target.value);
  }
  return (
    <div className="App w-100 vh-100 ">
      <h2>movie app </h2>
     
      <Form className='d-flex flex-column  w-100  mt-5 '>
        <Form.Group className="mb-3 w-50 justify-content-center " controlId="formSearch">
         
          <Form.Control type="text" placeholder="Enter your search" onChange={handleChange} />
        </Form.Group>
      </Form>
      <MovieApp searchText={search}/>
    </div>
  );
}

export default App;
