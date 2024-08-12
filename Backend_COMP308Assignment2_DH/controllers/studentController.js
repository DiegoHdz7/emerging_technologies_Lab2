const express = require('express')
var Student = require( "../models/student");


//Getting all students (array of students)
module.exports.getStudents = async (req, res, next) => {
    console.log("Executing: getStudents");

    try{
        await Student.find().exec((err, students) => {
            if (err) {
                res.status(400).send({Error:err});
    
            } else {
                res.header("Access-Control-Allow-Origin", "*");
                res.status(201).send(students); 
            }
        });
    

    }

    catch (error){
        console.log(error);

    }
   
}
module.exports.getOneStudent = async (req, res, next) => {
    console.log("Executing: getOneStudent");
    res.status(201).send(res.student);
   
}

//Adding a student
module.exports.addStudent = async (req, res, next) => {
    
    console.log("Executing: addStudent");
    try{
        const newStudent = new Student(req.body);
        await newStudent.save((err) => {
            if (err) {
                console.log(err);
                res.status(400).send({Error:err});
    
            } else {
                res.status(201).send({Success:'Student added successfully'}); 
    
            }
    
    
        });

    }

    catch (err){
        res.status(500).json({ message: err.message })
    }

   

}

// Update Student
module.exports.updateStudent = async (req, res, next) => {
    try {
        Student.updateOne({ _id: res.student._id }, req.body, (err) => { //updating the document that matches the id with the previous obj

            if (err) {
                console.log(err);
                res.status(400).send({error:err.message});
            } else {
                res.status(201).send({success:'Student updated successfully'});
            }

        })
    } 
    catch (err) {
      res.status(400).json({ message: err.message, source:"updateStudent" })
    }
}

module.exports.getStudent= async(req, res, next)=> {
    let student
    
    
    try {
      student = await Student.findById(req.params.id)
      if (student == null) {
        
        return res.status(404).json({ message: 'Cannot find student',source:"getStudent", path:req.url })
      }
    } catch (err) {
    
      return res.status(500).json({ message: err.message, source:"getStudent", path:req.url})
    }
  
    res.student = student
    next()
}

module.exports.deleteStudent = async(req,res,next)=>{

    try {
        
        await res.student.remove()
        res.json({ message: 'Student deleted' })
      } catch (err) {
        res.status(500).json({ message: err.message, source:"deleteStudent" })
      }
}

