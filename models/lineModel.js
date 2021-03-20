const mongoose = require("mongoose");


const RudeSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    line: {
        type: String,
        required: true,
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model("LineDB", RudeSchema);