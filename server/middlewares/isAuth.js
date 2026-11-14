import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
const isAuth = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded);
        const user = await User.findById(decoded.id);
        // console.log("User found:", user);
        if (!user) {
            return res.status(401).json({
                message: "User not found in database"
            });
        }
        //new key banadi req ke andar key name se
        req.user = user;
        //req ke andar hi user object ko store kar diya, taki next middleware me use kar sake
        next();
    }catch(e){
        return res.status(500).json({message: "invalid token"});
    }
}

export default isAuth