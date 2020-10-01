const Threat = require("../schemas/Threat");
const Hero = require("../schemas/Hero");
const threatController = require("./threatController");
const heroController = require("./heroController");
const getDistanceFromLatLonInKm = require("../utils/distanceCalculator");

const rankingSystem = {
    God: "S",
    Dragon: "A",
    Tiger: "B",
};

module.exports = {
    async store(req, res) {
        try {
            const {
                threat: { dangerLevel, monsterName, lat, lng },
            } = req.body;

            const location = {
                type: "Point",
                coordinates: [lng, lat],
            };
            const rank = rankingSystem[dangerLevel];

            const heroes = await Hero.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat],
                        },
                        // $maxDistance: 5000000,
                    },
                },
                rank,
            });

            const formatHeroesWithDistance = await Promise.all(
                heroes.map(async (hero) => {
                    let distanceInKm = getDistanceFromLatLonInKm(
                        { latitude: lat, longitude: lng },
                        {
                            latitude: hero.location.coordinates[1],
                            longitude: hero.location.coordinates[0],
                        }
                    );
                    let heroDistance = { hero, distanceInKm };
                    return heroDistance;
                })
            );

            return res.json({ success: true, formatHeroesWithDistance });
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
};
