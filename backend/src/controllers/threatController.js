const Threat = require("../schemas/Threat");

module.exports = {
    async index(req, res) {
        try {
            const threats = await Threat.find({});

            return res.json({ success: true, threats });
        } catch (err) {
            return res.status(400).json(err);
        }
    },
    /**
    @route POST hero
    @desc Register a hero in the database
    @access Auth'd
    */
    async store(req, res) {
        try {
            const { dangerLevel, monsterName, lat, lng, hero } = req.body;
            const location = {
                type: "Point",
                coordinates: [lng, lat],
            };

            const threat = await Threat.create({
                dangerLevel,
                monsterName,
                location,
                hero,
            });

            return res.json({ success: true, threat });
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
};
