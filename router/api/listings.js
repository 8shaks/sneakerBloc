const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Listing = require("../../models/Listing");
const validateListingInput = require("../../validation/listing");
const validateCommentInput = require("../../validation/comments");
const User = require("../../models/user");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
//create a post route

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  upload.single("productImage"),
  (req, res) => {
    const { errors, isValid } = validateListingInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newListing = new Listing({
      shoename: req.body.shoename,
      username: req.body.username,
      user: req.user.id,
      price: req.body.price,
      size: req.body.size
    });
    newListing
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err));
  }
);

//get posts

router.get("/", (req, res) => {
  Listing.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No posts were found" }));
});

//get one post

router.get("/:id", (req, res) => {
  Listing.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: "No post was found" }));
});

// delete a post

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Listing.findById(req.params.id).then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        post
          .remove()
          .then(() => res.json({ sucess: "true" }))
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
    });
  }
);

//comment on a post

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Listing.findById(req.params.id).then(post => {
      const newComment = {
        text: req.body.text,
        username: req.body.username,
        user: req.user.id
      };

      post.comments.push(newComment);

      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// delete a comment

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Listing.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        if (req.user.id !== post.comments[removeIndex].user.toString()) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
