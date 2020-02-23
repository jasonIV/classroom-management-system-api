const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
port = process.env.PORT || 3000;

app.use(bodyparser.json());

// connection configurations
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty12345',
    database: 'cms',
    multipleStatements: true
});
 
// connect to database
connection.connect((err)=>{
    if(!err){
        console.log('DB connection succeeded.');
    }
    else{
        console.log('DB connection failed \n Error: ' + JSON.stringify(err,undefined,2));
    }
});

app.listen(port, ()=>console.log('Express server is running at port no :' + port));

//Check auth
app.post('/auth',(req,res)=>{
    let crd = req.body;
    let sql = 'SET @username=?; SET @pw=?; SELECT * FROM teachers WHERE (username=@username AND pw=@pw);';
    connection.query(sql,[crd.username,crd.pw], (err, rows, fields)=>{
        if (rows[2].some(e=>e.username == crd.username && e.pw == crd.pw)){
            res.send({isAuthenticated: true});
        }
        else{
            res.send({isAuthenticated: false});
        }
    })
})

//Get all teachers
app.get('/teachers', (req, res)=>{
    let sql = 'SELECT * from teachers';
    connection.query(sql, (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

//Get all students
app.get('/students', (req, res)=>{
    let sql = 'SELECT * from students';
    connection.query(sql, (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

//Get specific teacher
app.get('/teachers/:id', (req, res)=>{
    let sql = 'SELECT * FROM teachers WHERE idteachers=?';
    connection.query(sql,[req.params.id],(err, rows, fields)=>{
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

//Get specific student
app.get('/students/:id', (req, res)=>{
    let sql = 'SELECT * FROM students WHERE idstudents=?';
    connection.query(sql,[req.params.id],(err, rows, fields)=>{
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

//Delete specific teacher
app.delete('/teachers/:id', (req, res)=>{
    let sql = 'DELETE FROM teachers WHERE idteachers=?';
    connection.query(sql,[req.params.id],(err, rows, fields)=>{
        if (!err){
            res.send('Deleted teacher successfully...');
        }
        else{
            console.log(err);
        }
    })
})

//Delete specific student
app.delete('/students/:id', (req, res)=>{
    let sql = 'DELETE FROM students WHERE idstudents=?';
    connection.query(sql,[req.params.id],(err, rows, fields)=>{
        if (!err){
            res.send('Deleted student successfully...');
        }
        else{
            console.log(err);
        }
    })
})

//Insert specific teacher
app.post('/teachers', (req, res)=>{
    let tch = req.body;
    var sql = 'SET @idteachers=?;SET @username=?;SET @pw=?;SET @first_name=?;SET @last_name=?;SET @email=?;SET @phone=?; \
    CALL TeacherAddorEdit(@idteachers,@username,@pw,@first_name,@last_name,@email,@phone);';    
    connection.query(sql,[tch.idteachers, tch.username, tch.pw, tch.first_name, tch.last_name, tch.email, tch.phone],(err, rows, fields)=>{
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})                                                                  

//Insert specific student
app.post('/students', (req, res)=>{
    let tch = req.body;
    var sql = 'SET @idstudents=?;SET @username=?;SET @pw=?;SET @first_name=?;SET @last_name=?;SET @email=?;SET @phone=?; \
    CALL StudentAddorEdit(@idstudents,@username,@pw,@first_name,@last_name,@email,@phone);';    
    connection.query(sql,[tch.idstudents, tch.username, tch.pw, tch.first_name, tch.last_name, tch.email, tch.phone],(err, rows, fields)=>{
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

//Update specific teacher
app.put('/teachers', (req, res)=>{
    let tch = req.body;
    var sql = 'SET @idteachers=?;SET @username=?;SET @pw=?;SET @first_name=?;SET @last_name=?;SET @email=?;SET @phone=?; \
    CALL TeacherAddorEdit(@idteachers,@username,@pw,@first_name,@last_name,@email,@phone);';    
    connection.query(sql,[tch.idteachers, tch.username, tch.pw, tch.first_name, tch.last_name, tch.email, tch.phone],(err, rows, fields)=>{
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
}) 

//Update specific student
app.put('/students', (req, res)=>{
    let tch = req.body;
    var sql = 'SET @idstudents=?;SET @username=?;SET @pw=?;SET @first_name=?;SET @last_name=?;SET @email=?;SET @phone=?; \
    CALL StudentAddorEdit(@idstudents,@username,@pw,@first_name,@last_name,@email,@phone);';    
    connection.query(sql,[tch.idstudents, tch.username, tch.pw, tch.first_name, tch.last_name, tch.email, tch.phone],(err, rows, fields)=>{
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})