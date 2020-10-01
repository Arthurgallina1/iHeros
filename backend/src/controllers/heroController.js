const Hero = require("../schemas/Hero");

module.exports = {
    /**
    @route POST hero
    @desc Register a hero in the database
    @access Auth'd
    */
    async store(req, res) {
        try {
            const { name, rank, lat, lng } = req.body;
            const location = {
                type: "Point",
                coordinates: [lng, lat],
            };

            const hero = await Hero.create({
                name,
                rank,
                location,
            });

            return res.json({ success: true, hero });
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
};
