const Hero = require("../schemas/Hero");

module.exports = {
    async index(req, res) {
        try {
            const heros = await Hero.find({});
            return res.json({ success: true, heros });
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
            return res.status(400).json(err);
        }
    },

    async update(req, res) {
        try {
            const { _id } = req.params;
            const { name, rank, lat, lng } = req.body;
            const location = {
                type: "Point",
                coordinates: [lng, lat],
            };
            const hero = await Hero.findByIdAndUpdate(
                { _id },
                { name, rank, location },
                { new: true }
            );
            return res.status(200).json({ success: true, hero });
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    async delete(req, res) {
        try {
            const { _id } = req.params;
            const hero = await Hero.findByIdAndRemove({ _id });
            return res.json({ success: true, hero });
        } catch (err) {
            return res.status(400).json(err);
        }
    },
};
