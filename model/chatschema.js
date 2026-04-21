const mongoose = require("mongoose");

const chatschema = new mongoose.Schema({
    userId: String,
    msg: [
        {
            role: String,
            content: String,
        },
    ],
});

module.exports = mongoose.model("Chat", chatschema);
