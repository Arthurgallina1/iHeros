const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/keys");
const User = require("../schemas/User");
const Yup = require("yup");

module.exports = {
    /**
    @route GET user/index/:following_id
    @desc Show all users 
    @access Auth'ed
    */

    async store(req, res) {
        const { name, username, email, password } = req.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                msg: "Username already taken!",
                success: false,
            });
        }

        try {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) throw err;
                    try {
                        const id = await User.create({
                            name,
                            username,
                            email,
                            password: hash,
                        });
                        return res.status(201).json({
                            id,
                            success: true,
                        });
                    } catch (err) {
                        return res.json(err).status(400);
                    }
                });
            });
        } catch (err) {
            return res.json(err).status(400);
        }
    },
};
