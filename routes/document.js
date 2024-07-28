const express = require('express');
const router = express.Router();
const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({storage})


// import from utils
const S3 = require("../utils/S3")
const prisma = require("../utils/prisma");
const Joi = require('joi');

router.post("/", upload.fields([
    {name: "ktp", maxCount: 1},
    {name: "kartukeluarga", maxCount: 1},
    {name: "ijazah", maxCount: 1},
    {name: "sktl", maxCount: 1}
    
]), async (req, res) => {
    
    const { userId } = req.body
    const files = req.files

    const parsedUserId = parseInt(userId)
    
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

    try {
        const ktpUrl = await uploadFileToS3(files.ktp[0])
        const kartukeluargaUrl = await uploadFileToS3(files.kartukeluarga[0])
        const ijazahUrl = await uploadFileToS3(files.ijazah[0])
        const sktlUrl = await uploadFileToS3(files.sktl[0])

        console.log("ktp:", files.ktp[0])
        console.log(ktpUrl)
        console.log(kartukeluargaUrl)
        console.log(ijazahUrl)
        console.log(sktlUrl)

        const userDocuments = await prisma.document.create({
            data: {
                userId: parsedUserId,
                ktp: ktpUrl,
                kartukeluarga: kartukeluargaUrl,
                ijazah: ijazahUrl,
                sktl: sktlUrl
            }
        })
        console.log(userDocuments)
        res.status(200).json({message: "Success", userDocuments})
    } catch (e) {
        console.log(e.message)
        res.status(400).json({message: "failed", error: e.message})
    }
})

module.exports = router