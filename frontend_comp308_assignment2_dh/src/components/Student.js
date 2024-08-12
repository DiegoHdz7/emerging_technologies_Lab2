import {React,useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Student({ studentProps, appProps }) {

  //URL
  const apiUrl = "http://localhost:3000/";

  //Hooks
  const navigate = useNavigate();
  const {id} = useParams();
  const [student, setStudent] = useState({});
  
  const [show, setShow] = useState(false);

  

  //Callbacks
  const openEdit = () => {
    appProps.setSelectedStudent(student)
    console.log("setSelectedStudent from studentComp:", appProps.selectedStudent)
    navigate('/edit-student');
  }

  const deleteUser = () => {

   

    console.log("URL: ", apiUrl)
    console.log("Student", student)
    //alert("You are going to delete a student")

    axios.delete(apiUrl+ student?._id)
      .then(function (response) {
        // handle success
        appProps.getStudents().then((res)=>{
          console.log("Data from db after update",res.data);
          appProps.setStudents(res.data);
          showFalse();
          navigate('/')
      });

      })
      .catch(function (error) {
        // handle error
        console.log(error);
        showFalse();
        
      })

    appProps.getStudents((response)=>{
      
    });

  }

  const getStudent = () => {   
    
    console.log(apiUrl+id)
    axios.get(apiUrl+id).then(function (response) {
      // handle success
      console.log(response);
      setStudent(response.data)
     

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
  };


  const showFalse = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  //UseEffect (Executed Only the first time component renders)
  useEffect(()=>{
    if(id){
      getStudent();
    }

    if(studentProps!=null){
      setStudent(studentProps)
    }
      
    

  },[]);

  //UseEffect (Executed each time component renders)
  useEffect(()=>{
    
  })

  


  //Conditional Rendering
  if (student == null) {
    return <h2> No Data to display</h2>
  }

  else {
    return (
      <>
        <td>{student._id}</td>
        <td>{student.studentNumber}</td> 
        <td>{student.firstName} </td>
        <td>{student.lastName}</td>
        <td>{student.address}</td>
        <td>{student.city}</td>
        <td>{student.phoneNumber}</td>
        <td>{student.email}</td>
        <td>{student.program}</td>
        <td><button onClick={openEdit}>Edit</button> </td>
        <td><button onClick={ handleShow}>Delete</button> </td>

        <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
    <Modal
        show={show}
        onHide={showFalse}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to delete a student record. Are you sure?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showFalse}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser} >Continue</Button>
        </Modal.Footer>
      </Modal>
    </div>
       
      </>
    )

  }

}
