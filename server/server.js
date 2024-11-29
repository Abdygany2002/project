const express = require("express")
const proxy = require("express-http-proxy")
const path = require("path")

const app = express();
const port = 3000;

app.use("/api", proxy("https://lb.linologi.ru"))

app.use(express.static(path.join(__dirname, "public")))

app.listen(port, () => {
    console.log(`Server started on PORT ${port}`)
})