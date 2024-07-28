const express = require('express');
const router = express.Router();
const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({storage})


// import from utils
const S3 = require("../utils/S3")
const prisma = require("../utils/prisma");
const Joi = require('joi');

router.post("/", upload.single("receipt"), async (req, res) => {
    
    const { userId, ...biodata} = req.body
    console.log(biodata, userId)

    const parsedUserId = parseInt(userId)
    
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
        userBiodata = await prisma.biodata.create({
            data: {
                userId: parsedUserId,
                ...biodata,
                birthDate: new Date(biodata.birthDate),
                fatherBirthdate: new Date(biodata.fatherBirthdate),
                motherBirthdate: new Date(biodata.motherBirthdate),
                receipt: receiptUrl
            }
        })
        res.status(200).json({message: "Success", userBiodata})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Failed to create biodata", error: e.message})
    }
})

router.post("/:id", async (req, res) => {
    const {id} = req.params
    const parsedId = parseInt(id)
    try {
        const deletedBio = await prisma.biodata.delete({
            where: {
                userId: parsedId,
            }
        })

        console.log(deletedBio)

    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message, error: error})
    }
})

module.exports = router