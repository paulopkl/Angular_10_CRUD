const mongoose = require('mongoose');

const Tutorial = new mongoose.Schema(
    {
        title: String,
        description: String,
        published: Boolean
    },
    { timestamps: true }
);

Tutorial.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
});

module.exports = mongoose.model('Tutorial', Tutorial);