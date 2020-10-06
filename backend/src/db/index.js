const mongoose = require("mongoose");

class Database {
    constructor() {
        this.mongo();
    }
    mongo() {
        const url = "mongodb://iheroes-mongodb:27017/iheros";
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
