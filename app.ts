import express from "express";
import path from "path"
import { sessionMiddleware, User } from "./util/middleware";
import { loginRoutes } from "./loginRoutes";
import { userRoutes } from "./userRoutes";


//initialise modules
const app = express();

declare module 'express-session' {
    interface SessionData {
        user?: User
    }
}

//load essential middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware) // for express-session

//RESTFUL API Route refactorisation

app.use(loginRoutes)
app.use(userRoutes)



// allow access to directories
app.use(express.static("public"))
app.use(express.static('images'))
//app.use(isLoggedin,express.static("public"))

//catch-all 
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"public","404.html"))
})

//listen to PORT
app.listen(8080, () => {
    console.log(`server listening on http://localhost:8080`);
})