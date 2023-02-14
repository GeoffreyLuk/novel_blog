import formidable, { Fields, Files } from "formidable";
import express from "express"
import {format} from "fecha"

export function formidableUserDetails(req: express.Request){
    const form = formidable({
        uploadDir : "./images/users",
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 200*1024**2,
        filter:(part)=> part.mimetype?.startsWith("image/") || false,
        filename: (orgName,orgExt,part,form)=>{
            let timestamp = format(new Date(), "YYYYMMDDHHmmss")
            let ext = part.mimetype?.split('/').pop()
            return `user-${timestamp}.${ext}`
        }
    
    })
    return new Promise<{fields:Fields; files:Files}>((resolve,reject)=>{
        form.parse(req, (err,fields,files)=>{
            if (err) {
                reject (err)
                return
            }
            resolve({
                fields,
                files
            })
        })
    })
}