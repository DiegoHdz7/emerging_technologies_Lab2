var express = require('express');
var router = express.Router();
var studentController = require('../controllers/studentController');

/* GET home page. */
router.get('/students', studentController.getStudents)
router.get('/:id',studentController.getStudent, studentController.getOneStudent)


//POST Routes
router.post('/add-student', studentController.addStudent);


//UPDATE Routes
router.patch('/:id',studentController.getStudent,studentController.updateStudent);

//DELETE Routes
router.delete('/:id',studentController.getStudent,studentController.deleteStudent);


module.exports = router;