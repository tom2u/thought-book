const { Schema, model } = require("mongoose");
//const moment = require("moment");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: "Please provide a user name.",
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: "Please provide a valid email address.",
      unique: true,
      lowercase: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Friend",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of friends
UserSchema.virtual("friendCount").get(function () {
  return this.friends.reduce((total, friend) => total + 1, 0);
});

// create the Pizza model using the PizzaSchema
const User = model("User", UserSchema);

// export the Pizza model
module.exports = User;
