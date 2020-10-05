const mongoose = require("mongoose");

class Database {
    constructor() {
        this.mongo();
    }
    mongo() {
        this.mongoConnectioon = mongoose.connect(
            "mongodb://localhost:27017/iheros",
            {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
            }
        );
    }
}

module.exports = new Database();
