const mongoose = require("mongoose");
const PointSchema = require("./PointSchema");

const HeroSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rank: {
            type: String,
            required: true,
        },
        location: {
            type: PointSchema,
            index: "2dsphere",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Hero", HeroSchema);
