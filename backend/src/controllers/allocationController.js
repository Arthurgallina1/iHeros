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
            const { dangerLevel, monsterName, location } = req.body;
            const [{ lat, lng }] = location;
            const locationPoint = {
                type: "Point",
                coordinates: [lng, lat],
            };

            const rank = rankingSystem[dangerLevel];
            let heroes = await Hero.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat],
                        },
                    },
                },
                rank,
                releaseTime: { $lt: new Date() },
            });
            let closestHero = "";
            if (heroes.length > 0) {
                closestHero = await findClosestHero(heroes, location);
            } else {
                heroes = await Hero.find({
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [lng, lat],
                            },
                        },
                    },
                    releaseTime: { $lt: new Date() },
                });
                if (heroes.length > 0) {
                    closestHero = await findClosestHero(heroes, location);
                } else {
                    await Threat.create({
                        dangerLevel,
                        monsterName,
                        location: locationPoint,
                        defeatedBy: "Destino",
                    });
                    return res.status(200).json({
                        success: true,
                        errorMsg: "Nenhum Herói disponivel no momento",
                    });
                }
            }

            const recoveryTime = addHours(
                new Date(),
                Number(recoveryTimeTable[dangerLevel])
            );

            closestHero.releaseTime = recoveryTime;
            await closestHero.save();

            await Threat.create({
                dangerLevel,
                monsterName,
                location: locationPoint,
                defeatedBy: closestHero.name,
            });

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
