const mongoose = require("mongoose");

class Database {
    constructor() {
        this.mongo();
    }
    mongo() {
        const {
            MONGO_USERNAME,
            MONGO_PASSWORD,
            MONGO_HOSTNAME,
            MONGO_PORT,
            MONGO_DB,
        } = process.env;
        const url = "mongodb://iheroes-mongodb:27017/iheros";
        // const url = "mongodb://root:mongodb@iheroes-mongodb:27017/iheros";
        this.mongoConnectioon = mongoose
            .connect(url, {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
            })
            .then(function () {
                console.log("MongoDB is connected");
            })
            .catch((err) => console.log(err));
    }
}

module.exports = new Database();
