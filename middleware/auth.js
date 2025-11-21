import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authenticateToken(req, res, next)
{ 
    try {
        var authHeader = req.headers['authorization'];
        console.log(req.cookies.token)
        var token = authHeader;

        if (token == null) {
        }
        jwt.verify(token, process.env.secret_key, (err, decoded)=>{
            if (err) {
                console.log("invalid token");
                return res.status(500).json({
                    message: "Token error",
                });
            }
            // console.log(decoded);
            next();
        });
    } catch (error) {
        return res.send(error.message);
    }
}
