const ejs = require('ejs');
const mysql = require('mysql');
const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
//mysql connection
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'learncode'
});
connection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('database connected')
    }
});
//setting ejs
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    let sql = 'SELECT * FROM users'
    let query = connection.query(sql,(err,rows)=>{
     if (err) throw err;
   console.log(rows)
    res.render('index',{
        title:'CRUD Operation using nodejs/expressjs/mysql',
        users:rows
    });

    console.log(typeof rows)
});   
})
app.post('/addUser',(req,res)=>{
   let name = req.body.name;
   let email = req.body.email;
   let phone_no = req.body.phone;
   
    let sql = `insert into users (name,email,phone_no) values('${name}','${email}','${phone_no}')` ;
     let query = connection.query(sql,(err,results)=>{
         if(err)throw err;
        res.redirect('/');

    });
});
app.post('/update',(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let phone_no = req.body.phone;
    const id = req.body.id;
    console.log(name)
    console.log(id)
     let sql = `update users set name = '${name}', email = '${email}',phone_no = '${phone_no}' where id = ${id}` ;
      let query = connection.query(sql,(err,results)=>{
          if(err)throw err;
         res.redirect('/');
 
     });
 });


app.get('/adduser',(req,res)=>{
    res.render('adduser',{
        title:'CRUD operation using nodejs/expressjs/mysql'
    })
})

app.get('/edit/:userid',(req,res)=>{
    const userid =req.params.userid;
    let sql = `select * from users where id= ${userid}`
    let query = connection.query(sql,(err,result)=>{
        console.log(result[0])
        if(err) throw err;
        res.render('userEdit',{
            title:'CRUD operation using nodejs/expressjs/mysql',
            user:result[0]
        });
    });
    
});

app.get('/delete/:userid',(req,res)=>{
    const userid =req.params.userid;
    let sql = `delete  from users where id= ${userid}`
    let query = connection.query(sql,(err,result)=>{
        if(err) throw err;
      res.redirect('/')
    });
    
});
const PORT= process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))