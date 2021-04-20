const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const axios = require("axios");

const Order = require("../models/order");
const Product = require("../models/product");

// const verifyPayment = (amount, token) => {
//   let data = {
//     token: token,
//     amount: amount * 100,
//   };

//   let config = {
//     headers: {
//       Authorization: "Key test_secret_key_f59e8b7d18b4499ca40f68195a846e9b",
//     },
//   };

//   axios
//     .post("https://khalti.com/api/v2/payment/verify/", data, config)
//     .then((response) => {
//       console.log(response.data);
//       return true;
//     })
//     .catch((error) => {
//       console.log(error);
//       return false;
//     });
// };

// get orders
router.get("/", checkAuth, (req, res, next) => {
  const { role } = req.userData;
  if (role === "admin" || role === "merchant") {
    Order.find()
      .populate("items.item")
      .exec()
      .then((docs) => {
        res.status(200).json({
          count: docs.length,
          orders: docs,
          // orders: docs.map((doc) => {
          //   return {
          //     _id: doc._id,
          //     name: doc.name,
          //     address: doc.address,
          //     orderDate: doc.orderDate,
          //     phone: doc.phone,
          //     items: doc.items,
          //     // items: doc.items.map((food) => {
          //     //   return {
          //     //     name: food.item,
          //     //   };
          //     // }),
          //     status: doc.status,
          //   };
          // }),
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    res.status(405).json({
      message: "not authorized",
    });
  }
});

// post order
router.post("/", (req, res, next) => {
  // const verified = verifyPayment(req.body.price, req.body.token);

  // if (verified) {
  //   const order = new Order({
  //     _id: mongoose.Types.ObjectId(),
  //     name: req.body.name,
  //     address: req.body.address,
  //     phone: req.body.phone,
  //     price: req.body.price,
  //     items: req.body.items,
  //     token: req.body.token,
  //   });
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    price: req.body.price,
    items: req.body.items,
    token: req.body.token,
  });

  order
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  // } else {
  //   res.status(500).json({
  //     error: "payment not verified",
  //   });
  // // }
});

// get orderId
router.get("/:orderId", checkAuth, (req, res, next) => {
  const { role } = req.userData;
  if (role === "admin" || role === "merchant") {
    Order.findById(req.params.orderId)
      .populate("items.item")
      .exec()
      .then((order) => {
        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders",
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    res.status(405).json({
      message: "not authorized",
    });
  }
});

// get order status
router.get("/orderStatus/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .select("_id name address status")
    .exec()
    .then((result) => {
      res.status(200).json({
        order: result,
        request: {
          type: "GET",
          url: "http://localhost:3001/orderStatus/:orderId",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// update order status
router.patch("/:orderId", checkAuth, (req, res, next) => {
  const { role } = req.userData;
  const id = req.params.orderId;
  const newStatus = req.body.newStatus;
  if (role === "admin" || role === "merchant") {
    Order.findByIdAndUpdate(id, { status: newStatus }, function (err, docs) {
      if (err) {
        res.status(401).json({
          error: err,
        });
      } else {
        res.status(200).json({
          message: "changed order status",
        });
      }
    });
  } else {
    res.status(405).json({
      message: "not authorized",
    });
  }
});

// delete order
router.delete("/:orderId", checkAuth, (req, res, next) => {
  const { role } = req.userData;
  if (role === "admin") {
    Order.deleteOne({ _id: req.params.orderId })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "order deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/orders",
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    res.status(405).json({
      message: "not authorized",
    });
  }
});

//verify Khalti payment
router.get("/verify", (req, res, next) => {
  const token = req.body.token;
  const amount = req.body.amount;

  let data = {
    token: token,
    amount: amount,
  };

  let config = {
    headers: {
      Authorization: "Key test_secret_key_f59e8b7d18b4499ca40f68195a846e9b",
    },
  };

  axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
      console.log(response.data);
      res.status(200).json({
        status: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
