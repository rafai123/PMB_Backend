const express = require('express');
const router = express.Router();

// import from utils
const S3 = require("../utils/S3")
const prisma = require("../utils/prisma");
const Joi = require('joi');
const bcrypt = require("bcryptjs")

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('laki-laki', 'perempuan').required(),
    password: Joi.string().min(8).required(),
    // avatar: Joi.string().required(),
})

router.post("/", async (req, res) => {
    const { error } = registerSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message})
    }

    const { name, email, gender, password } = req.body
    console.log(name, email)
    const hashedpassword = await bcrypt.hash(password, 10)

    let ava = "cowo"

    if ( gender === "perempuan" ) {
        ava = "cewe"
    }

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                gender,
                password: hashedpassword,
                avatar: ava
            }
        })
        res.status(200).json({ message: "Success! User created", user })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({ message: "Failed to create user", error: e.message })
    }
})

module.exports = router