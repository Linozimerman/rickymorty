const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const episodesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    characters: [{type: mongoose.Schema.Types.ObjectId, ref:"Character"}]
});
const Episodes = mongoose.model('Episodes', episodesSchema);

module.exports = Episodes;