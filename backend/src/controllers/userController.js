const connection = require("../utils/dbconn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/keys");
const Yup = require("yup");

module.exports = {
  /**
    @route GET user/index/:following_id
    @desc Show all users 
    @access Auth'ed
    */

  async store(req, res) {
    const { name, user, email, password } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    try {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          try {
            const [id] = await connection("users")
              .insert({
                name,
                username: user,
                email,
                password_hash: hash,
              })
              .returning("id");
            // console.log({ id });
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
