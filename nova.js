const express=require("express");
const mysql=require("mysql");
const port=3000;
const app=express();



app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome to backend api");
})
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`);
})
 
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"employee_management"
})
conn.connect((err)=>{
    if(err){
        console.error("do not connect with database ");
    }
    console.log("well connected");
})
app.post("/add",(req,res)=>{
    const{fname,lname,email,department,created_at}=req.body;
    const sql="INSERT INTO employee(fname,lname,email,department,created_at)VALUES(?,?,?,?,?)";
    conn.query(sql,[fname,lname,email,department,created_at],(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        
        }
        res.status(200).json({
            fname,
            lname,
            email,
            department,
            created_at
        });
    })

})
app.get("/get",(req,res)=>{
    const sql="SELECT*FROM employee";
    conn.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        res.status(201).json({result});

    });
})
app.get("/get/:id",(req,res)=>{
    const{id}=req.params;
    const sql="SELECT*FROM employee WHERE id=? ";
    conn.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        res.status(200).json({result});

    })
});
app.delete('/delete/:id',(req,res)=>{
    const{id}=req.params;
    const sql="DELETE FROM employee WHERE id=?";
    conn.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        res.status(201).json({"message":"data is deleted successful"});
    })

})
