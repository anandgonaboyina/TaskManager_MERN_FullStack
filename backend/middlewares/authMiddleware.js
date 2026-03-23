const jwt = require("jsonwebtoken")
exports.protect = async (req, res, next)=>

{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1];
        if(!token)
            return res.status(401).json(
        {
            message:"Acees Denied : No token provided"
        })
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id                   //adding user to req object of api call
        next();                                 //forward to next sequence middlewares => routes
    }
    catch(err)
    {
        res.status(401).json({message:"invalid token or Expired Token"})
    }
}