const connection = require("../utils/dbconn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/keys");

module.exports = {
  /**
    @route POST user/auth
    @desc Auth user login
    @access Public
    */
  async auth(req, res) {
    const { username, password } = req.body;
    try {
      const user = await connection("users")
        .where("username", username)
        .select("id", "name", "email", "username", "password_hash", "createdAt")
        .first();
      if (!user) {
        return res.status(400).json({
          msg: "User not found!",
          success: false,
        });
      }

      if (!(await bcrypt.compare(password, user.password_hash))) {
        return res.status(400).json({
          msg: "Invalid password!",
          success: false,
        });
      }

      user.password_hash = undefined;

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
