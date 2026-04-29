import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  menuItem: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  orderType: 'delivery' | 'takeaway';
  deliveryAddress?: {
    street: string;
    area: string;
    landmark?: string;
    pincode: string;
  };
  deliveryDistance?: number; // in km
  paymentMethod: 'upi' | 'card' | 'wallet' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDetails?: {
    transactionId?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
  };
  customerPhone: string;
  customerName: string;
  estimatedDeliveryTime: Date;
  actualDeliveryTime?: Date;
  specialRequests?: string;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    menuItem: {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    specialInstructions: String
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryFee: {
    type: Number,
    default: 0,
    min: 0
  },
  tax: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderType: {
    type: String,
    enum: ['delivery', 'takeaway'],
    required: true
  },
  deliveryAddress: {
    street: String,
    area: String,
    landmark: String,
    pincode: String
  },
  deliveryDistance: Number,
  paymentMethod: {
    type: String,
    enum: ['upi', 'card', 'wallet', 'cod'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    transactionId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  estimatedDeliveryTime: {
    type: Date,
    required: true
  },
  actualDeliveryTime: Date,
  specialRequests: String,
  cancellationReason: String
}, {
  timestamps: true
});

// Generate unique order number
OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    this.orderNumber = `KM${year}${month}${day}${random}`;
  }
  next();
});

// Index for queries
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ orderNumber: 1 });

export default mongoose.model<IOrder>('Order', OrderSchema);
