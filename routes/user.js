const express = require('express');
const router = express.Router();
const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({storage})

// import from utils
const S3 = require("../utils/S3")
const prisma = require("../utils/prisma")

router.get("/getall", async (req, res) =>{
    try {
        const users = await prisma.user.findMany({
            include: {
                biodata: true,
                documents: true,
            }
        })

        res.status(200).json({message: "Success", users})
    } catch (e) {
        console.log(e.message)
        res.status(400).json({message: "error", error: e.message})
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: {id: parseInt(id) },
            include: {
                biodata: true,
                documents: true,
            }
        })

        if (user) {
            res.status(200).json({message: "success", user})
        } else {
            res.status(404).json({message: "userNotFound", error:"userNotFound"})
        }
    } catch (e) {
        console.log(e.message)
        res.status(400).json({message: e.message, error:e.message})
    }
})

router.post("/delete/:id", async (req, res) => {
    const { id } = req.params

    try {
        await prisma.user.delete({
            where: {id: parseInt(id)},
        })

        res.status(200).json({message: "success"})
    } catch (e) {
        console.log(e.message)
        res.status(400).json({message: e.message})
    }
})


module.exports = router;