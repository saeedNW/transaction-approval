const express = require('express')
const app = express()
const port = 3003
const {initializeSwagger} = require("./initSwagger");


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
    app.use("/", require("./router"))
    initializeSwagger(app);
})