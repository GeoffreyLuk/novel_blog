import express from "express";
import path from "path"
import Knex from "knex";
import expressSession from "express-session"
import { User } from "./util/middleware";
import { formidableUserDetails } from "./util/formidable";
import { isLoggedIn } from "./util/guard";


const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

export const loginRoutes = express.Router()

loginRoutes.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

loginRoutes.get("/logout", (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
                res.redirect("/?message=error")
                return
            }
        })
        res.redirect("/?message=successfully+logged+out")
        return
    } else {
        res.redirect("/")
        return
    }
})

loginRoutes.get("/test", (req, res) => {
    console.log("test")
    console.log("req.sessionID: ", req.sessionID)
    console.log("req.session.user: ", req.session.user)
    console.log("test on truthy: ", req.session.user ? "true" : "false")
    res.redirect("/?message=test+successful")
})

loginRoutes.get("/changeInfo",(req,res)=>{
    res.sendFile(path.join(__dirname,'public','changeInfo.html'))
})

loginRoutes.get("/userInfo", isLoggedIn ,async (req,res)=>{
    let user = req.session.user!.id
    let knexData = (await knex
        .select("*")
        .from("users")
        .where("id", "=", user))[0]
    delete knexData.password
    res.status(200).json(knexData)
})

loginRoutes.post('/login', async (req, res) => {
    let { email, password } = req.body
    try {
        try {
            if (!req.session.user) {
                let knexData = await knex
                    .select("*")
                    .from("users")
                    .where("email", "=", email)
                req.session.user = {
                    id: knexData[0]["id"],
                    first_name: knexData[0]["first_name"],
                    last_name: knexData[0]["last_name"],
                    permission: knexData[0]["permission_id"]
                }
            } else {
                res.status(400).json({ message: "Already Logged in" })
                return
            }
            res.status(200).json({ message: "Redirecting...." })
            return
        } catch (error) {
            console.log("error when pulling user data")
            res.status(401).json({ message: "User not found" })
            return
        }
    } catch (error) {
        console.log("error with post /login")
        res.status(500).json({ message: "Server error during login" })
        return
    }
})

loginRoutes.post('/signup', async (req, res) => {
    try {
        if (!req.session.user) {
            let data = await formidableUserDetails(req)
            let reqData = data.fields
            let dob = reqData["date_of_birth"] ? reqData["date_of_birth"] : null
            let fileName = data.files.icon ? data.files.icon['newFilename'] : "default_user_icon.png"

            let newUserData = await knex
                .insert({
                    first_name: reqData["first_name"],
                    last_name: reqData["last_name"],
                    date_of_birth: dob,
                    email: reqData["email"],
                    password: reqData["password"],
                    icon: fileName
                })
                .into("users")
                .returning(["id", "first_name", "last_name", "permission_id"])

            req.session.user = {
                id: newUserData[0]["id"],
                first_name: newUserData[0]["first_name"],
                last_name: newUserData[0]["last_name"],
                permission: newUserData[0]["permission_id"]
            }
            res.status(200).json({ message: "Successful Signup" })
            return
        } else {
            res.status(400).json({ message: "Already Logged in" })
            return
        }
    } catch (error) {
        console.log("error with post /login")
        res.status(500).json({ message: "Server error during signup" })
        return
    }
})

loginRoutes.put("/changeInfo", (req, res) => {
    try {
        
    } catch (error) {
        console.log("error with post /login")
        res.status(500).json({ message: "Server error during changing info" })
        return
    }


})












// loginRoutes.get("/login", (req, res) => {
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

// loginRoutes.get("/test", (req, res) => {
//     console.log("test")
//     console.log("req.sessionID: ", req.sessionID)
//     console.log("req.session.user: ", req.session.user)
//     console.log("test on truthy: ", req.session.user ? "true" : "false")
//     res.status(200).json({ message: "test successful" })
// })