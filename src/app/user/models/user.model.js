import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  rNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['manager', 'engineer', 'foreman QC', 'foreman AC', 'foreman WL', 'admin'] ,
    required: true
  },
  unit: [{
    type: String,
    required: true,
    trim: true
  }],
  /* refreshToken: {
    type: String,
    required: true,
    trim: true
  }, */
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
