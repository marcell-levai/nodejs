import { AuthService } from "../business/services/auth.service";
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
    private authservice: AuthService;

    constructor(){
        this.authservice = new AuthService();
    }

    authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const userId = req.header('x-user-id');
            await this.authservice.authenticateUser(userId);
            next();
        }catch(error){
            return res.status(error.status || 500).json({ data: null, error: { message: error.message || 'Internal Server Error' }});
        }
    };
}