import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MovieApp } from './Movieapp';
import { useState } from 'react';
import projectlogo from './projectlogo.jpg';
function App() {
  const [search,setSearchText]=useState('');

  const handleChange=(event)=>{
console.log(event.target.value);
setSearchText(event.target.value);
  }
  return (
    <div className="App p-2  bg-light rounded-3 ">
      <h1 className='display-2'> Movie Search App  </h1>
      <img className='w-100' height={500}  src={projectlogo}alt=''/>
      <Form className=' mt-5 '>
        <Form.Group className="mb-3 d-flex justify-content-center  " controlId="formSearch">
         
          <Form.Control className='w-25 h-50  ' type="text" placeholder="Enter your search" onChange={handleChange} />
        </Form.Group>
      </Form>
      <MovieApp searchText={search}/>
      
    </div>
  );
}

export default App;
