import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function AddEditStudent({ appProps }) {

    //Refs
    const studentNumberRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const programRef = useRef();
    const navigate = useNavigate();
  

    //URL
    const apiUrl = "http://localhost:3000/";

    //Json obj  to send (schema)
    const [newStudent, setNewStudent] = useState({

        studentNumber: null,
        firstName: null,
        lastName: null,
        address: null,
        city: null,
        phoneNumber: null,
        email: null,
        program: null,
    })

    //Events callbacks
    const updateInputsValues = () => {

        setNewStudent({

            studentNumber: studentNumberRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            address: addressRef.current.value,
            city: cityRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            email: emailRef.current.value,
            program: programRef.current.value,
        });



    }
    const addStudent = (e) => {
        e.preventDefault();
        
        // Make a request for a user with a given ID
        

        axios.post(apiUrl+'add-student', newStudent)
            .then(function (response) {
                // handle success
                //console.log(response.data);
                appProps.getStudents().then((res)=>{
                    console.log("Data from db after update",res.data);
                    appProps.setStudents(res.data);
                    navigate('/')
                });

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        //navigate('/')
    }

    const updateStudent = async (e)=>{
       // alert('Updated');
        e.preventDefault();
        
        // Make a request for a user with a given ID
        

        axios.patch(apiUrl+ appProps.selectedStudent._id, newStudent)
            .then(function (response) {
                // handle success
                //console.log(response.data);
                appProps.getStudents().then((res)=>{
                    console.log("Data from db after update",res.data);
                    appProps.setStudents(res.data);
                    navigate('/')
                });
                 
                //window.location.reload(false)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        

        
    }

    useEffect(()=>{
      console.log("appProps.selectedStudent._id: ", appProps.selectedStudent._id)
        
    },[]);

    return (
        <>
            <h1>Add student</h1>
            <Form /*onSubmit={addStudent}*/>

                <Form.Group>
                    <Form.Label>Student Number</Form.Label>
                    <Form.Control ref={studentNumberRef} type="number" name="studentNumber" id="studentNumber"
                        placeholder='Enter Student Number'  defaultValue= {appProps?.selectedStudent?.studentNumber}
                        onChange={updateInputsValues} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> First Name</Form.Label>
                    <Form.Control ref={firstNameRef} type="text" name="firstName" id="firstName" placeholder="Enter first name" 
                        defaultValue = {appProps?.selectedStudent?.firstName} onChange={updateInputsValues} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> Last Name</Form.Label>
                    <Form.Control ref={lastNameRef} type="text" name="lastName" id="lastName" placeholder="Enter last name"
                     defaultValue = {appProps?.selectedStudent?.lastName} onChange={updateInputsValues} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> Address</Form.Label>
                    <Form.Control ref={addressRef} type="text" name="address" id="address" placeholder="Enter address"
                     defaultValue = {appProps?.selectedStudent?.address} onChange={updateInputsValues} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control ref={cityRef} type="text" name="city" id="city" placeholder="Enter city"
                    defaultValue = {appProps?.selectedStudent?.city}  onChange={updateInputsValues} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control ref={phoneNumberRef} type="number" name="phoneNumber" id="phoneNumber" placeholder="Enter phone number"
                      defaultValue = {appProps?.selectedStudent?.phoneNumber} onChange={updateInputsValues} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email </Form.Label>
                    <Form.Control ref={emailRef} type="email" name="email" id="email" placeholder="Enter email"
                    defaultValue = {appProps?.selectedStudent?.email}  onChange={updateInputsValues} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Program </Form.Label>
                    <Form.Control ref={programRef} type="text" name="program" id="program" placeholder="Enter program" 
                    defaultValue = {appProps?.selectedStudent?.program} onChange={updateInputsValues} />
                </Form.Group>

                {appProps.selectedStudent._id==null? 
                <Button variant="primary" type="submit" onClick={addStudent}> Add</Button>
                     : <Button variant="primary" type="submit" onClick={updateStudent}> Update</Button>}

                

            </Form>
        </>
    )
}
