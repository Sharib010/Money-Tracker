const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const authenticate = require("../middleware/Authenticate");

const userAcc = require("../model/userAcc");
const expense = require("../model/userData");

router.post("/signup", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  const find_acc = await userAcc.findOne({ email: email });
  if (!find_acc) {
    const new_acc = new userAcc({
      name,
      email,
      password,
      cpassword,
    });

    await new_acc.save((err) => {
      if (err) {
        res.send({ message: "Something went Wrong, try again" });
      } else {
        res.send({ message: "Signup successfully" });
      }
    });
  } else {
    res.send({ message: "User already exist" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const find_acc = await userAcc.findOne({ email: email });
  var token;
  if (!find_acc) {
    res.json({ error: "invalid crediential error" });
  } else {
    const isMatch = await bcrypt.compare(password, find_acc.password);
    if (!isMatch) {
      res.json({ error: "invalid crediential error" });
    } else {
      token = await find_acc.generateAuthToken();
      
      res.send(token);
    }
  }
});

router.post("/budget", async (req, res) => {
  const { budget, handler_id } = req.body;

  const result = await userAcc.findOneAndUpdate(
    { email: handler_id },
    {
      budget: budget,
    },
    { new: true, upsert: false }
  );
  res.send(result);
});

router.post("/groupExpense", (req, res) => {
  const {
    handler_id,
    category,
    description,
    amount,
    budget,
    remaining,
    group_name,
    group_member,
    date,
  } = req.body;
  if (!handler_id || !category || !description || !amount) {
    res.send("fill  mendatoy entries");
  } else {
    const add_expense = new expense({
      handler_id,
      category,
      description,
      amount,
      budget,
      remaining,
      group_name,
      group_member,
      date,
    });

    add_expense.save((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
});

router.post("/expense", (req, res) => {
  const { handler_id, category, description, amount, date } = req.body;
  if (!handler_id || !category || !description || !amount) {
    res.send("fill  mendatoy entries");
  } else {
    const add_expense = new expense({
      handler_id,
      category,
      description,
      amount,
      date,
    });

    add_expense.save((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
});

router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/friendList", (req, res) => {
  const { handler_id, friend } = req.body;
  var frd = friend;
  userAcc.findOneAndUpdate(
    { email: handler_id },
    {
      $push: {
        friends: frd,
      },
    },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

router.post("/deleteItem", (req, res) => {
  const { id } = req.body;
  expense.deleteOne({ _id: id }, () => {
    res.send({ message: "Expense Deleted" });
  });
});

module.exports = router;
