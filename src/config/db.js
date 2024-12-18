const mongoose = require("mongoose")
const config = require("./config");

const dbURL = config.db.url;
mongoose.connect(dbURL)
    .then(() => {
        console.log('Mongodb atlas is connected ');
    })
    .catch((err) => {
        console.log(err);
        process.exit(1)
    })