import express from "express";
import {logger,gaurd,validator} from "../middleware/index.js"
import fs from "fs";
const router = express.Router();

router.get('',logger,(req,res) => {
    try {
        fs.readFile("posts.json",(err,data) => {
            if(err) {
                throw err;
            }
            console.log(JSON.parse(data));
            return res.send(JSON.parse(data).posts);
        })
        // return res.send(JSON.parse(data));
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error"})
    }
})

router.post("/create",validator,(req,res) => {
    try {
        fs.readFile("posts.json",(err,data) => {
            if(err) {
                throw err;
            }
            const datas = JSON.parse(data);
            datas.posts.push(req.body);
            fs.writeFile("posts.json",JSON.stringify(datas),(err) => {
                if(err) {
                    throw err;
                }
                return res.send("Data Posted")
            })
        })
    } catch (error) {
        return  res.status(500).send({message:"Internal Server Error"})
    }
})

router.put("/:id",gaurd,(req,res) => {
    try {
        fs.readFile("posts.json",(err,data) => {
            if(err) {
                throw err;
            }
            const datas = JSON.parse(data);
            datas.posts.map((e,index) => e.id == req.params.id?datas.posts[index]=req.body:null);  

            //update the data
            fs.writeFile("posts.json",JSON.stringify(datas),(err) => {
                if(err) {
                    throw err;
                }
                return res.send("Data Updated")
            })      
        })
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error"})
    }
})

router.delete("/:id",gaurd,(req,res) => {
    try {
        fs.readFile("posts.json",(err,data) => {
            if(err) {
                throw err;
            }
            const datas = JSON.parse(data);
            datas.posts.filter(e => e.id != req.params.id);  

            //delete the data
            fs.writeFile("posts.json",JSON.stringify(datas),(err) => {
                if(err) {
                    throw err;
                }
                return res.send("Data Deleted")
            })      
        })
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error"})
    }
})

export {router};