const express = require('express');
const multer = require('multer');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const path = require('path');


const storage = multer.diskStorage({
    destination : './src/image/',
    filename : (req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage : storage
})


router.get('/',employeeController.getEmployeeList);

router.get('/:id',employeeController.getEmployeeById);

router.post('/',upload.single('image'),employeeController.createNewEmployee);

router.put('/:id',employeeController.updateEmployee);

router.delete('/:id',employeeController.deleteEmployee);

module.exports = router;