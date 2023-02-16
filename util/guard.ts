import express from "express"

export const isLoggedIn = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if (!req.session.user){
        res.redirect("/login?message=Please+login")
    } else {
        next()
        return
    }
}