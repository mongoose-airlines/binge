const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvshowSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	cast: {
		type: [String],
		required: true
	},
	description: {
		type: String
	},
	seasons: {
		type: Number
	},
	episodes: {
		type: Number
	},
	releaseDate: {
		type: Number
	},
	imdbRating: {
		type: Number
	},
	image: {
		type: String
	},
	addedBy: { type: Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true })
 
module.exports = mongoose.model('Tvshow', tvshowSchema);
