const express = require('express');
const router = express.Router();
const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({storage})

// import from utils
const S3 = require("../utils/S3")
const prisma = require("../utils/prisma");
const Joi = require('joi');
const bcrypt = require("bcryptjs")

const loginSchema = Joi.object({    
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
})

router.post("/", async (req, res) =>{
    const { error } = loginSchema.validate(req.body)

    if(error){
        return res.status(400).json({error: error.details[0].message})
    }

    console.log(req.body)
    const {email, password} = req.body
    console.log(email, password)

    const user = await prisma.user.findUnique({ where: { email, } }) 
    
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({message: "Invalid email or password"})
    }

    res.status(200).json({message: "Login success", user})
})


module.exports = router;