import { Request, Response, NextFunction, RequestHandler } from "express";
import { AuthService } from "../../business/services/auth.service";

export class AuthController {
    private authservice: AuthService;

    constructor(){
        this.authservice = new AuthService();
    }

    registerUser: RequestHandler = async (req, res) => {   
        try{
            const { email, password, role } = req.body;
            const newUser = await this.authservice.register(email, password, role);
            return res.status(200).json(newUser);
        }catch(error){
            return res.status(error.status || 500).json({ data: null, error: { message: error.message || 'Internal Server Error' }});
        }
    }

    loginUser: RequestHandler = async (req, res) => {   
        try{
            const { email, password } = req.body;
            const responseToken = await this.authservice.login(email, password);
            return res.status(200).json({ data: { token: responseToken }, error: null });
        }catch(error){
            return res.status(error.status || 500).json({ data: null, error: { message: error.message || 'Internal Server Error' }});
        }
    }
}