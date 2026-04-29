import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  name: string;
  email?: string;
  phone: string;
  password?: string;
  googleId?: string;
  role: 'user' | 'admin';
  addresses: Array<{
    _id: mongoose.Types.ObjectId;
    street: string;
    area: string;
    landmark?: string;
    pincode: string;
    isDefault?: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    unique: true,
    match: [
      /^(\+91)?[6-9]\d{9}$/,
      'Please add a valid Indian phone number'
    ]
  },
  password: {
    type: String,
    minlength: 6,
    select: false
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  addresses: [new Schema({
    street: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    landmark: String,
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }, { _id: true })]
}, {
  timestamps: true
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(): string {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    } as jwt.SignOptions
  );
};

// Match user entered password to hashed password in database
UserSchema.methods.comparePassword = async function(enteredPassword: string) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
