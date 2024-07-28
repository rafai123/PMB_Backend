const AWS = require('aws-sdk')

const S3 = new  AWS.S3({
    region: "auto",
    endpoint: process.env.ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    }
})
// console.log(process.env.R2_ACCESS_KEY_ID)
// console.log(process.env.ENDPOINT)
// console.log(process.env.POSTGRES)
// console.log(process.env.R2_SECRET_ACCESS_KEY)

module.exports = S3