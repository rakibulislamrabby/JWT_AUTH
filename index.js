const express = require('express');
const cors = require("cors")
const app = express();
const config = require("./src/config/config");
const userRouter = require("./src/modules/user/user.Router")

const PORT = config.app.port;
require("./src/config/db")

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter)


app.use("*", (req, res) => {
    res.send("Invalid Route")
})
app.listen(PORT, () => {
    console.log('server is running port', PORT);
})
