import express from "express";
import path from "path"
import Knex from "knex";
import { User } from "./util/middleware";


const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

export const userRoutes = express.Router()

userRoutes.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname,'public','login.html'))
})

userRoutes.get("/logout",(req,res)=>{
    if (req.session.user){
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
                res.redirect("/?message=error")
                return
            }
        })
        res.redirect("/?message=successfully+logged+out")
        return
    }else{
        res.redirect("/")
        return
    }
})

userRoutes.post('/login',(req,res)=>{
    let {email,password} = req.body
    console.log(email)
    console.log(password)
    async function tempPullData(email:string,password:string): User|String{
        let user = await knex
        .select("*")
        .where("email","=",email)
    }

    res.status(200).redirect("/?message=successfully+logged+in")
})

userRoutes.get("/test", (req, res) => {
    console.log("test")
    console.log("req.sessionID: ", req.sessionID)
    console.log("req.session.user: ", req.session.user)
    console.log("test on truthy: ", req.session.user ? "true" : "false")
    res.redirect("/?message=test+successful")
})













// userRoutes.get("/login", (req, res) => {
//     req.session.user = {
//         id: 0,
//         first_name: 'test',
//         last_name: 'test',
//         permission: 0
//     }
//     console.log("login")
//     console.log("req.sessionID: ", req.sessionID)
//     console.log("req.session.user: ", req.session.user)
//     console.log("test on truthy: ", req.session.user ? "true" : "false")


//     req.session["user"] = {
//         id: 0,
//         first_name: 'test',
//         last_name: 'test',
//         permission: 0
//     }

//     res.status(200).redirect("/")
// })

// userRoutes.get("/test", (req, res) => {
//     console.log("test")
//     console.log("req.sessionID: ", req.sessionID)
//     console.log("req.session.user: ", req.session.user)
//     console.log("test on truthy: ", req.session.user ? "true" : "false")
//     res.status(200).json({ message: "test successful" })
// })