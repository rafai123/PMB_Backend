const express = require("express")
const cors = require("cors")
// const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3")
// const AWS = require("aws-sdk")
const dotenv = require("dotenv")

const app = express()
const port = 3003

// import routes
const loginRouter = require("./routes/login")
const registerRouter = require("./routes/register")
const biodataRouter = require("./routes/biodata")
const documentRouter = require("./routes/document")
const userRouter = require("./routes/user")
const adminRouter = require("./routes/admin")

// middleware
app.use(cors())
dotenv.config()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Backend for PMB is running!")
})

// routes
app.use("/login", loginRouter)
app.use("/register", registerRouter)
app.use("/biodata", biodataRouter)
app.use("/document", documentRouter)
app.use("/user", userRouter)
app.use("/admin", adminRouter)


app.listen(port, () => {
    console.log(`Server is lisening on port ${port}`)
})

// export default app
module.exports = app