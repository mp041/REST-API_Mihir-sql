const e = require('express');
const EmployeeModel = require('../models/employee.model');



exports.getEmployeeList = (req,res) => {
    EmployeeModel.getAllEmployees((err,employees) => {
        console.log("we are here.");
        if(err)
        res.send(err);
        console.log('Employees',employees);
        res.send(employees);
    })
}

exports.getEmployeeById =(req,res) => {
    // console.log("get emplpyee by id");
    EmployeeModel.getEmployeeById(req.params.id,(err,employee) => {
        if(err)
        res.send(err);
        console.log('Employee single Data.',employee);
        res.send(employee);
    })
}


exports.createNewEmployee = (req,res) => {
    // console.log("req data 123",req.body);
    var data = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        phone : req.body.phone,
        organization : req.body.organization,
        image : req.file.filename
    }

    const employeeReqData = new EmployeeModel(data);
    // console.log(employeeReqData);

    if(req.body.constructor === Object && Object(req.body).length === 0){
        res.send(400).send({message:'please fill the data'});
    }else{
        console.log('valid data');
        EmployeeModel.createEmployee(employeeReqData,(err,employee)=> {
            if(err)
            res.send(err);
            res.json({message:'Employee Created successfully!',data:employee.insertId})
        })
    }
}

exports.updateEmployee = (req,res) => {
    const employeeReqData = new EmployeeModel(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({message:'please fill the data'});
    }else{
        console.log('valid data');
        EmployeeModel.updateEmployee(req.params.id,employeeReqData,(err,employee)=> {
            if(err)
            res.send(err);
            res.json({message:'Employee Updated successfully!'})
        })
    }
}

exports.deleteEmployee = (req,res) => {
    EmployeeModel.deleteEmployee(req.params.id,(err,employee) => {
        if(err)
        res.send(err);
        res.json({message:'Employee deleted successfully.'})
    })
}