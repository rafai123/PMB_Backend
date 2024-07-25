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
    
    let receiptUrl

    const uploadFileToS3 = async (file) =>{
        // from hamster
        const publicBucketUrl = "https://pub-83c13c4b6141426b8e4d3d54567ecbb9.r2.dev/";
        let randomKey = Math.round(Math.random() * 9999999999);
        let stringRandomKey = `${randomKey}-HamsterPedia.com`;
        const fileUrl = `${publicBucketUrl}${stringRandomKey}`;
        receiptUrl = fileUrl

        try {
            await S3.upload({
                Body: req.file.buffer,
                Bucket: "fullstack-team",
                Key: stringRandomKey,
                ContentType: req.file.mimetype
            }).promise()
        } catch (e) {
            console.error(e)
        }
    }

    if(req.file) {
        receiptUrl = await uploadFileToS3(req.file)
    }

    try {
        userBiodata = await prisma.document.create({
            data: {
                userId,
                ...biodata,
                birthDate: new Date(biodata.birthDate),
                fatherBirthDate: new Date(biodata.fatherBirthDate),
                motherBirthDate: new Date(biodata.motherBirthDate),
                receipt: receiptUrl
            }
        })
        res.status(200).json({message: "Success", userBiodata})
    } catch (e) {
        res.status(400).json({message: "Failed to create biodata", error: e.message})
    }
})

module.exports = router