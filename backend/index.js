import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express();
app.use(cors());

const db = mysql.createConnection({
    host:"sql6.freemysqlhosting.net",
    user:"sql6685679",
    password:"DdJ67CCwhM",
    database:"sql6685679",
    connectTimeout: 15000, // Adjust this value as needed
    
})

app.get("/books",(req,res) => {
    const q = "SELECT * FROM books"

    db.query(q,(err,data) => {
        if(err){
            console.log(err);
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post("/add",(req,res) => {
    const q = "INSERT  INTO library (`Title`,`Subject`,`Author`,`Publish_Date`) VALUES(?)";
    const Values = [
        req.body.Title,
        req.body.Subject,
        req.body.Author,
        req.body.Publish_Date,
    ]
    db.query(q,[Values],(err,data) => {
        if(err) return res.json(err)
        console.log(res)
        return res.json("Added");
    })
})

app.get("/search/:searchterm",(req,res)=>{
    const title = req.params.searchterm;
   
    if(!title) return res.json({error:"Title Required"});
    const q = "SELECT * FROM books WHERE Title = ? OR Subject = ? OR Author = ? OR Publish_Date = ?"
    
    db.query(q,[title,title,title,title],(err,data)=>{
        if(err){
           
            return res.json(err)
        }
    //    console.log(data);
        return res.json(data)
    });
});

app.listen(8000,() => {
    console.log("running");
})
