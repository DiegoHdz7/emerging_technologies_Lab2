import { React, useEffect, useState } from 'react'
import axios from 'axios';
import Student from './Student';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import {

  useNavigate,
} from "react-router-dom";

export default function Home({ appProps }) {

  //URL
  const apiUrl = "http://localhost:3000/";

  //Hooks
  const navigate = useNavigate()
  const [data, setData] = useState([]);




  //UseEffect (Executed once while rendered first time)

  useEffect(() => {
    console.log('First Rendering Home')
    appProps.setSelectedStudent({})
    appProps.getStudents().then((response) => {
      appProps.setStudents(response.data);
      //setData(response.data)
    })

  }, []);

  //UseEffect (Executed each time component renders)
  useEffect(() => {

    appProps.getStudents().then((response => {
      if (JSON.stringify(response.data) != JSON.stringify(appProps.students)) {

        appProps.setStudents(response.data);
        console.log("Response distinct to data")
        console.log("Changing data to:", response.data, "data: ", appProps.students)


      }
    }))

  })

  useEffect(() => { });


  //Component Rendering
  return (
    <>
      <h1>Home</h1>
      
        <Table striped bordered hover size="sm" >
          <thead>
            <tr>
              <th>_id</th>
              <th>studentNumber</th>
              <th>firstName </th>
              <th>lastName</th>
              <th>address</th>
              <th>city</th>
              <th>phoneNumber</th>
              <th>email</th>
              <th>program</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>

          <tbody>
          {appProps.students.map((student, index) => (
          <tr key={index}><Student key={index} studentProps={student} appProps={appProps} /*homeProps={homeProps}*/ /> </tr> ))}

          </tbody>
        </Table>
        
        
     
    </>
  );

}
