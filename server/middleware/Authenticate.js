const jwt = require("jsonwebtoken");
const userAcc = require("../model/userAcc");
const expense = require("../model/userData");


const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const find_user = await userAcc.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!find_user) {
      throw new Error("user not found");
    }

    const rootUser = await expense.find({ handler_id: find_user.email });
    const acc_info = find_user;
    req.token = token;
    req.rootUser = { rootUser, acc_info };
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("unauthorized User");
    console.log(error);
  }
};

module.exports = Authenticate;
