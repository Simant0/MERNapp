const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const multer = require("multer");
const fs = require("fs");
const checkAuth = require("../middleware/check-auth");

// to store images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir("./uploads", (err) => {
      cb(null, "./uploads/");
    });
  },
  filename: function (req, file, cb) {
    cb(null, "" + file.originalname);
  },
});

// filter file upload
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// to upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

// get products
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id info type image")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        product: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            image: doc.image,
            _id: doc._id,
            type: doc.type,
            info: doc.info,
            request: {
              type: "GET",
              url: "http://localhost:5000/api/products/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// post products to create a product
router.post("/", checkAuth, upload.single("image"), (req, res, next) => {
  const { role } = req.userData;
  if (role == "admin") {
    console.log(req.file);
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      image: req.file.path,
      info: req.body.info,
      type: req.body.type,
    });
    product
      .save()
      .then((result) => {
        return res.status(200).json({
          message: "Created product",
          createdProduct: product,
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

// get productId
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name _id price info type image")
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        return res.status(200).json(doc);
      } else {
        return res.status(404).json({ message: "no valid productfound" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// patch product to update the product
// send updating fields in an array in the form
// [{ "propName": "fieldName", "value": "newValue"}]
router.patch("/:productId", checkAuth, (req, res, next) => {
  const { role } = req.userData;
  if (role === "admin") {
    const id = req.params.productId;
    const updateFields = {};
    for (const field of req.body) {
      updateFields[field.propName] = field.value;
    }
    Product.updateOne({ _id: id }, { $set: updateFields })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "product updated",
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

// delete product
router.delete("/:productId", checkAuth, (req, res, next) => {
  const { role } = req.userData;
  if (role == "admin") {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  } else {
    res.status(405).json({
      message: "not authorized",
    });
  }
});

module.exports = router;
