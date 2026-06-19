const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    appliedDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      default: "Applied",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Application", applicationSchema);
