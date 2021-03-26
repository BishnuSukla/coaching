import jwt from 'jsonwebtoken';

import User from '../services/target-user';

let { JWT_SECRET } = process.env;

if(!JWT_SECRET){
    console.error("JWT_SECRET is not defined, Please check .env settings");
    process.exit(1);
}

const generateToken = (username,password) =>
    jwt.sign(
        {
            user: {username,password},
            iat: Math.floor(Date.now()/1000) - 30
        },
        JWT_SECRET,
        {algorithm: "HS512"}
    );



const isValidateToken = ()=>{
    return async(req,res,next) => {
        let {token} = req.headers;
        if(!token){
            res.status(401).json({
                success: false,
                message: 'Token is required',
                error: 'Unauthorized!!'
            });
        }
        const decodeToken = jwt.verify(token,JWT_SECRET, {
            algorithm: ["HS512"]
        });
        if(!decodeToken){
            res.status(403).json({
                success: false,
                message: 'Invalid token',
                error: 'Access denied!!'
            })
        }
        const user = new User();
        let isExist = await user.OnExistsUser(decodeToken.user.username);
        if(!isExist.status){
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: isExist.error
            })
        }
        if(decodeToken.user.password !== isExist.user.password){
            res.status(401).json({
                success: false,
                message: 'Invalid authentication',
                error: 'Wrong password!!'
            })
        }
        next();
    }
}
export {generateToken, isValidateToken};