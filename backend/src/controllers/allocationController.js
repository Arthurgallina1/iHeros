const { addHours } = require("date-fns");
const Threat = require("../schemas/Threat");
const Hero = require("../schemas/Hero");
const threatController = require("./threatController");
const heroController = require("./heroController");
const getDistanceFromLatLonInKm = require("../utils/distanceCalculator");
const { findClosestHero } = require("../utils/utils");

const rankingSystem = {
    God: "S",
    Dragon: "A",
    Tiger: "B",
    Wolf: "C",
};

const recoveryTimeTable = {
    God: 168,
    Dragon: 120,
    Tiger: 48,
    Wolf: 24,
};

module.exports = {
    async store(req, res) {
        try {
            const {
                threat: { dangerLevel, monsterName, location },
            } = req.body;
            // const location = {
            //     type: "Point",
            //     coordinates: [lng, lat],
            // };
            const [{ lat, lng }] = location;
            // const location = { lat, lng };
            const rank = rankingSystem[dangerLevel];

            const heroes = await Hero.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat],
                        },
                    },
                },
                rank,
            });
            let closestHero = "";
            if (heroes.length > 0) {
                closestHero = await findClosestHero(heroes, location);
            }

            const recoveryTime = addHours(
                new Date(),
                Number(recoveryTimeTable[dangerLevel])
            );

            closestHero.releaseTime = recoveryTime;
            await closestHero.save();

            return res.json({
                success: true,
                closestHero,
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
};
