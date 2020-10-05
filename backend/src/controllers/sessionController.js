const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/keys");
const User = require("../schemas/User");

module.exports = {
    /**
    @route POST user/auth
    @desc Auth user login
    @access Public
    */
    async auth(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({
                    msg: "Usuario não encontrado!",
                    success: false,
                });
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({
                    msg: "Invalid password!",
                    success: false,
                });
            }

            return res.json({
                user,
                token: jwt.sign({ id: user.id }, authConfig.secret, {
                    expiresIn: "7d",
                }),
            });
        } catch (err) {
            console.log(err);
            return res.json(err).status(400);
        }
    },
};
