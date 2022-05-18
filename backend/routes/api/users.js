const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//for paypal
const http = require("http");
const paypal = require("paypal-rest-sdk");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const location = require("location-href");

require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51IIG9OFnB9XCFR50eRaZ3PAvT46VTx0ksujla3jdReYQfT0SYiB1ewoPQN1D8ZSxyvvHOfzqfaxfsiKYe9Io6VZs00t55VzRw1"
);

router.use(cors());

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

//paypal configure
var client_id =
  "AdWts09QGPBIkNuqCONPZ_aN6Sy5DqGf_zwoAhJTj4rqJGlsA__q3S0UYR-9kr1V_g43hRWIVbgCAWeA";
var secret =
  "ENxwVJGr-n4loXhKBiXJzkhsuCK2HoydXRYlwXL80xjRELA1UePoUYt59OBPhcZdaj6n41psYyv7HO0c";

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: client_id,
  client_secret: secret,
});

var userID;
var userAmount;
var cardAmount;
// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/stripe", async (req, res) => {
  //user sends price along with request
  const userPrice = parseInt(req.body.price) * 100;
  // const userPrice = parseFloat(req.body.price).toFixed(2);

  //create a payment intent
  const intent = await stripe.paymentIntents.create({
    //use the specified price
    amount: userPrice,
    currency: "EUR",
  });

  //respond with the client secret and id of the new paymentintent
  cardAmount = req.body.price;
  userID = req.body.doctor;
  res.json({ client_secret: intent.client_secret, intent_id: intent.id });
});

router.post("/confirm-payment", async (req, res) => {
  //extract payment type from the client request
  const paymentType = String(req.body.payment_type);

  //handle confirmed stripe transaction
  if (paymentType == "stripe") {
    //get payment id for stripe
    const clientid = String(req.body.payment_id);

    //get the transaction based on the provided id
    stripe.paymentIntents.retrieve(clientid, function (err, paymentIntent) {
      //handle errors
      if (err) {
        console.log(err);
      }

      //respond to the client that the server confirmed the transaction
      if (paymentIntent.status === "succeeded") {
        if (cardAmount == 25) {
          User.findByIdAndUpdate(
            userID,
            { $inc: { membership1: 1 } },
            (err, data) => {
              if (err) {
              } else {
                res.json({ success: true });
              }
            }
          );
        }
        if (cardAmount == 40) {
          User.findByIdAndUpdate(
            userID,
            { $inc: { membership2: 1 } },
            (err, data) => {
              if (err) {
              } else {
                res.json({ success: true });
              }
            }
          );
        }
        if (cardAmount == 10) {
          User.findByIdAndUpdate(
            userID,
            { $inc: { membership3: 1 } },
            (err, data) => {
              if (err) {
              } else {
                res.json({ success: true });
              }
            }
          );
        }
        // res.json({success: true})
      } else {
        res.json({ success: false });
      }
    });
  }
});

router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        originPassword: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/get-all-doctors", (req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.post("/delete-user", (req, res) => {
  User.findByIdAndDelete(req.body.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

router.post("/get-one-user", (req, res) => {
  User.findById(req.body.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

router.get("/buy-with-paypal", (req, res) => {
  console.log(req.query.amount);
  var payReq = JSON.stringify({
    intent: "sale",
    redirect_urls: {
      return_url: "http://localhost:5000/api/users/process",
      cancel_url: "http://localhost:5000/api/users/cancel",
    },
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: req.query.amount,
          currency: "USD",
        },
        description: "This is the payment transaction description.",
      },
    ],
  });

  paypal.payment.create(payReq, function (error, payment) {
    if (error) {
      console.error(error);
    } else {
      //capture HATEOAS links
      var links = {};
      payment.links.forEach(function (linkObj) {
        links[linkObj.rel] = {
          href: linkObj.href,
          method: linkObj.method,
        };
      });

      //if redirect url present, redirect user
      if (links.hasOwnProperty("approval_url")) {
        userID = req.query.doctor;
        userAmount = req.query.amount;
        res.send(links["approval_url"].href);
      } else {
        console.error("no redirect URI present");
      }
    }
  });
});

router.get("/process", function (req, res) {
  var paymentId = req.query.paymentId;
  var payerId = { payer_id: req.query.PayerID };

  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      console.error(error);
    } else {
      if (payment.state == "approved") {
        if (userAmount == "25") {
          User.findByIdAndUpdate(
            userID,
            { $inc: { membership1: 1 } },
            (err, data) => {
              if (err) {
                console.log(User.membership1);
              } else {
                res.sendFile(__dirname + "/paypal.html");
              }
            }
          );
        }
        if (userAmount == "40") {
          User.findByIdAndUpdate(
            userID,
            { $inc: { membership2: 1 } },
            (err, data) => {
              if (err) {
              } else {
                res.sendFile(__dirname + "/paypal.html");
              }
            }
          );
        }
      } else {
        res.send("payment not successful");
      }
    }
  });
});

module.exports = router;
