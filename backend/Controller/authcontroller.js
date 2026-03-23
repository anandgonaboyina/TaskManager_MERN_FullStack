const bcrypt = require("bcryptjs")
const Users = require("../models/Users.js")
const jwt = require("jsonwebtoken")

exports.login = async (req, res, next)=>
{
    try
    {
        console.log(req.body)
        const {email, password} = req.body
        let user = await Users.findOne({email})
        if(!user)
        {
           return res.status(404).json(
                {
                    success:false,
                    message:"User not found"
                }
            )
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if(!ismatch)
            return res.status(400).json(
        {
            success:false,
            message:"Creditions are invalid"
        })
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"})

        res.status(200).json(
            {
                message:"Login successful",
                token:token
            }
        )

    }
    catch(err)
    {
        next(err)
    }
}