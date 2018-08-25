const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BiddingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  ShoeName: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Size: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        text: String,
        required: true
      },
      username: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Biddings = mongoose.model("biddings", BiddingsSchema);
