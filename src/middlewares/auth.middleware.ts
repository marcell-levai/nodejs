import { AuthService } from "../business/services/auth.service";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../../config';

export class AuthMiddleware {
    private authservice: AuthService;

    constructor(){
        this.authservice = new AuthService();
    }

    verifyToken = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
            return res.status(401).send("Token is required");
        }
    
        const [tokenType, token] = authHeader.split(' ');
    
        if (tokenType !== 'Bearer') {
            return res.status(403).send("Invalid Token");
        }
    
        try {
            jwt.verify(token, TOKEN_KEY!);
            next();
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }      
    }

    adminAccessControl = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.header("x-user-id");
        const role = await this.authservice.checkUserRole(userId);

        if(role === "admin"){
            return res.status(403).send("Access Forbidden");
        }
        next();
    }
}