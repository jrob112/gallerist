const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const { Schema, model } = mongoose;
const db_uri = process.env.DB_URI;

mongoose
  .connect(db_uri)
  .then(() => console.log('Connection to Database successful'))
  .catch((err) => console.log('Could not connect to database ', err));

const UserSchema = new Schema({
  // username: String,
  googleId: String,
  name: String,
  // gallery: Array,
  friends: Array,
  wallet: Number,
  quizHighScore: Number,
  quizTotalScore: Number,
});
UserSchema.plugin(findOrCreate);

const ArtSchema = new Schema({
  title: String,
  artist: String,
  date: String,
  culture: String,
  imageId: {
    type: Number,
    unique: true,
  },
  url: String,
  imageUrl: String,
  userGallery: Object,
  isForSale: Boolean,
  price: Number,
});

const MemeSchema = new Schema({
  title: String,
  imageUrl: String,
  options: Object,
  user_id: String,
  imageId: String,
});

const VaultSchema = new Schema({
  name: String,
  owner: {
    // **mongoose references other schemas like this**
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  code: {
    type: String,
  },
  artGallery: [{
    type: Schema.Types.ObjectId,
    ref: 'Art',
  }],
});

const AIC_Schema = new Schema({
  id: { type: Number, required: true },
  image_id: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const WatchedSchema = new Schema({
  email: {
    type: Schema.Types.String,
    ref: 'User',
  },
  name: {
    type: Schema.Types.String,
    ref: 'User',
  },

  title: {
    type: Schema.Types.String,
    ref: 'Art',
  },
  message: String,
  isWatched: Boolean,
});

const User = model('User', UserSchema);
const Art = model('Art', ArtSchema);
const Meme = model('Meme', MemeSchema);
const Vault = model('Vault', VaultSchema);
const AICart = model('AICart', AIC_Schema);

module.exports = {
  User, Art, Meme, Vault, AICart, Watch,
};
