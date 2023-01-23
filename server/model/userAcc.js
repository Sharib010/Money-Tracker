const mongoose = require("mongoose");
const bcrytpt = require("bcrypt");
const jwt = require("jsonwebtoken");


const Accounts = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  cpassword: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    default: 0,
  },

  friends: [
    {
      type: String,
      default: "",
    },
  ],
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// hashing password
Accounts.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrytpt.hash(this.password, 12);
    this.cpassword = await bcrytpt.hash(this.cpassword, 12);
  }
  next();
});

Accounts.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const userAcc = mongoose.model("userAcc", Accounts);

module.exports = userAcc;
