const mongoose = require("mongoose");

class Database {
    constructor() {
        this.mongo();
    }
    mongo() {
        this.mongoConnectioon = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        });
    }
}

module.exports = new Database();
