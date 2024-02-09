import {Request, Response, NextFunction} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'

export interface CustomRequest extends Request {
    userId?: string;
    files?: any
}

const validateToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(" ")[1]
    try {
        if (token) {
            const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload    
            req.userId = decodeData.id
        } else {
            return res.status(403).json({message: 'Invalid token'})
        }
    } catch (err) {
        console.log(err, 'err in token'); 
    }
    next()
}

export default validateToken