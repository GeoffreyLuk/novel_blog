import expressSession from 'express-session'

    
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    permission: number
}

export const sessionMiddleware = expressSession({
        secret: "This is my secret code fuckers",
        resave: true,
        saveUninitialized: true
    })


    