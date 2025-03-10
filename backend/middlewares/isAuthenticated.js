import jwt from "jsonwebtoken";

const isAuthenticated=async (req,res,next) => {
    try {
        const token=req.cookies.token
        if(!token){
            return res
            .status(401)
            .json({
                message:"Unautheticated user",
                success:false
            })
        }else{
            const decode=jwt.verify(token, process.env.SECRET_KEY)
            if(!decode){
                return res
                .status(401)
                .json({
                    message:"Invalid token",
                    success:false
                })
            }else{
                req.id=decode.userId
                next()
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
        
    }
    
}

export default isAuthenticated