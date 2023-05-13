const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const route = require('./routes/route')

const app = express()
app.use(cors())
app.use(express.json())
const port = 3001

mongoose.connect("mongodb+srv://Dipen1234:jVP8pyAv3s3NzEM3@cluster0.dkmbl.mongodb.net/demo-Application", {
    useNewUrlParser: true
})
    .then(() => {
        console.log("Connected to MongoDb Successfully!");
    })
    .catch((err) => console.log(err.message))

app.use('/', route)

app.listen(port, () => {
    console.log("Demo Application running on port" + port);
})
