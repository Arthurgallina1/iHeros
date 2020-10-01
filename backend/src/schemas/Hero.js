import mongoose from "mongoose";
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

export default mongoose.model("Hero", HeroSchema);
