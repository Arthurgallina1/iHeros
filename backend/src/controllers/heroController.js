const connection = require("../utils/dbconn");

module.exports = {
    /**
    @route POST hero
    @desc Register a hero in the database
    @access Auth'd
    */
    async store(req, res) {
        try {
            const { name, rank, location } = req.body;
            console.log(location);
            const hero = connection("heros").insert({
                name,
                rank,
                location,
            });
            console.log(hero);
            return res.json({ success: true, hero });
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
};
