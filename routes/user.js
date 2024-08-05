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

router.post("/updatepayment/:id", upload.single("receipt"), async (req, res) => {
    const {id} = req.params
    const { status } = req.body
    console.log(status)
    console.log(id)


    let receiptUrl

    const uploadFileToS3 = async (file) =>{
        // from hamster
        const publicBucketUrl = "https://pub-83c13c4b6141426b8e4d3d54567ecbb9.r2.dev/";
        let randomKey = Math.round(Math.random() * 9999999999);
        let stringRandomKey = `${randomKey}-pmbstikomtb.com`;
        const fileUrl = `${publicBucketUrl}${stringRandomKey}`;
        receiptUrl = fileUrl

        try {
            await S3.upload({
                Body: file.buffer,
                Bucket: "fullstack-team",
                Key: stringRandomKey,
                ContentType: file.mimetype
            }).promise()

            return receiptUrl
        } catch (e) {
            console.error(e)
        }
    }

    if(req.file) {
        receiptUrl = await uploadFileToS3(req.file)
        console.log(receiptUrl)
    }


    try {
        await prisma.biodata.update({
            where: {userId: parseInt(id)},
            data: {
                receipt: receiptUrl,
                status: status,
            }
        })
        console.log("success")
        res.status(200).json({message: "success"})
        // refresh this page
    } catch (e) {
        console.log(e.message)
        res.status(400).json({message: e.message})
    }
})


module.exports = router;