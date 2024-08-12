import { React, useState, useEffect, useRef} from 'react';
import {
  Route,
  Link,
  useNavigate,
  Routes
} from "react-router-dom";
import Home from "./components/Home";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import AddEditStudent from './components/AddEditStudent';
import { Button } from 'react-bootstrap';
import Student from './components/Student';
import axios from 'axios';

function App() {

   //URL
   const apiUrl = "http://localhost:3000/";

  //Hooks
  const [selectedStudent, setSelectedStudent] = useState({});
  const [students, setStudents] = useState([]);
  const searchRef = useRef();
  const navigate = useNavigate();

  const getStudents = async () => {

    try {
      const res = await axios.get(apiUrl + 'students');
      return res;
    } catch (error) {
      // Handle errors
      return error;
    }



  }
 

  

  //Props Objects
  const appProps = {
    selectedStudent: selectedStudent,
    students:students,
    setStudents:setStudents,
    setSelectedStudent: setSelectedStudent,
    getStudents:getStudents
  }

  //Callbacks

  const onSearch = ()=>{
    navigate("/"+searchRef.current.value);
    

  }


  useEffect(() => {
    document.title = 'Diego Hernandez Lab 2';
  }, []);
  return (
    <>
      
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                <Nav.Link as={Link} to="/add-student"  >Add student</Nav.Link>

                <Form.Group>
                    <Form.Control ref={searchRef} type="text"  placeholder='Enter ID'/>
                    <Button  variant="success" onClick={onSearch}>Search by _id</Button>
                    
                </Form.Group>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>



        <Routes>
          <Route index element={<Home appProps={appProps} />} />
          <Route path="home" element={<Home appProps={appProps} />} />
          <Route path="/add-student" element={<AddEditStudent appProps={appProps}/>} />
          <Route path="/edit-student" element={<AddEditStudent appProps={appProps} />} />
          <Route path="/:id" element={<Student studentProps = {null} appProps={appProps} />} />
        </Routes>
    


    </>
  );
}

export default App;
