const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
    title: String,
    date: String,
    story: String,
    author: String,
    tags: [String],
    img: String,
    rating: Number,
    views: Number,
    // comments: [String]
})

const Story = mongoose.model("Story", storySchema);

module.exports = Story