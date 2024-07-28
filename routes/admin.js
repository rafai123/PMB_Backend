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

// const loginSchema = Joi.object({    
//     email: Joi.string().email().required(),
//     password: Joi.string().min(3).required(),
// })

router.post("/login", async (req, res) =>{
    // const { error } = loginSchema.validate(req.body)

    // if(error){
    //     return res.status(400).json({error: error.details[0].message})
    // }

    console.log(req.body)
    const {email, password} = req.body
    console.log(email, password)

    const user = await prisma.admin.findUnique({ where: { email, } }) 
    
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({message: "Invalid email or password"})
    }

    res.status(200).json({message: "Login success", user})
})

router.post("/register", async (req, res) => {
    // const { error } = registerSchema.validate(req.body)
    // if (error) {
    //     return res.status(400).json({ message: error.details[0].message})
    // }

    const { name, email, avatar, password } = req.body
    console.log(name, email)
    const hashedpassword = await bcrypt.hash(password, 10)

    // let ava = "https://pub-83c13c4b6141426b8e4d3d54567ecbb9.r2.dev/60443788106602"

    // if ( gender === "perempuan" ) {
    //     ava = "https://pub-83c13c4b6141426b8e4d3d54567ecbb9.r2.dev/6576422857671"
    // }

    try {
        const admin = await prisma.admin.create({
            data: {
                name,
                email,
                // gender,
                password: hashedpassword,
                avatar: avatar
            }
        })
        console.log(admin)
        res.status(200).json({ message: "Success! admin created", admin })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({ message: "Failed to create user", error: e.message })
    }
})


module.exports = router;