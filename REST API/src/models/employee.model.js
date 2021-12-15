const e = require('express');
const dbConn = require('../../src/config/db.config');

var Employee = function (employee){
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.phone = employee.phone;
    this.organization = employee.organization;
    this.created_at = new Date();
    this.image = employee.image;
}   


Employee.getAllEmployees = (result) => {
    dbConn.query('SELECT * FROM employee',(err,res)=> {
        if(!err){
            console.log("employees fetched successfully.");
            result(null,res);
        }else{
            console.log("error",err);
            result(null,err);
        }
    })
}

Employee.getEmployeeById = (id,result) => {
    dbConn.query('SELECT * FROM employee WHERE id = ?',id , (err,res) => {
        if (!err) {
            console.log("employee by id success");
            result(null,res);
        }else{
            console.log("error",err);
            result(null,err);
        }
    })
}

Employee.createEmployee = (employeeReqData,result) => {
    // console.log(employeeReqData);
    dbConn.query('INSERT INTO employee SET ?',employeeReqData,(err,res)=>{
        if(!err){
            console.log('Employee created successfully');
            // console.log(res);
            result(null,res)
        }else{
            console.log('error while inserting data.');
            console.log(err);
            result(null,err);
        }
    })
}

Employee.updateEmployee = (id,employeeReqData,result) => {
    dbConn.query('UPDATE employee SET first_name = ?, last_name = ?, email =?, phone= ?, organization = ? WHERE id = ? ',
    [employeeReqData.first_name,employeeReqData.last_name,employeeReqData.email,employeeReqData.phone,employeeReqData.organization,id],(err,res)=> {
        if(!err){
            console.log("Employee Updated successfully.");
            result(null,res);
        }else{
            console.log("error while updating data.");
            result(null,err);
        }
    })
}

Employee.deleteEmployee = (id,result) =>{
    dbConn.query('DELETE FROM employee WHERE id = ?',[id],(err,res)=>{
        if (!err) {
            console.log("Successfully Deleted.");
            result(null,res);
        }else{
            console.log("error in Deleting");
            result(null,err)
        }
    })
}

module.exports = Employee;