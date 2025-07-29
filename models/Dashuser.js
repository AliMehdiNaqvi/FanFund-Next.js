import mongoose from 'mongoose';
const { Schema, model } = mongoose
const DashuserSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
   username: String, 
  Profession: String,
  profilePic: String,
  coverPic: String,
  StripeKey: String,
  StripeSecret: String,
}, { timestamps: true });

export default mongoose.models.Dashuser || model('Dashuser', DashuserSchema);
