const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("");
const User = require("../model/user")
const login = async (req, res) => {
  try {
    // Get user input

    const { email, password } = req.body;
    console.log("email, password", email, password);
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      const userObj = {
        ...user._doc,
        token,
      };

      // user
      return res.status(200).json(userObj);
    }
  } catch (err) {
    return res.status(400).send("Invalid Credentials");
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body || {};
    if (!firstName && !lastName && !email && !password) {
      res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({
      email,
    });
    if (oldUser) {
      res.status(400).send("User Allready Registred");
      return;
    }
    const encryptedUserPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    const userObj = {
      ...user._doc,
      token,
    };
    res.status(201).json(userObj);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  login,
  register
};
