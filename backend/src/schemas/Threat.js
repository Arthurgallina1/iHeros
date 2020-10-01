const mongoose = require("mongoose");
const PointSchema = require("./PointSchema");
const Hero = require("./Hero");

const ThreatSchema = new mongoose.Schema(
    {
        monsterName: {
            type: String,
            required: true,
        },
        dangerLevel: {
            type: String,
            required: true,
        },
        hero: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hero",
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

module.exports = mongoose.model("Threat", ThreatSchema);
