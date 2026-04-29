import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance conditionally
let razorpay: Razorpay | null = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

export const createRazorpayOrder = async (orderId: string, amount: number) => {
  try {
    if (!razorpay) {
      throw new Error('Razorpay not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: orderId,
      payment_capture: 1, // Auto capture payment
      notes: {
        orderId,
        restaurantName: 'Kuruva Mess House'
      }
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create payment order');
  }
};

export const verifyRazorpayPayment = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean => {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay key secret not configured');
      return false;
    }

    const sign = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    return expectedSign === razorpaySignature;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

export const refundPayment = async (paymentId: string, amount?: number) => {
  try {
    if (!razorpay) {
      throw new Error('Razorpay not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
    }

    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount ? amount * 100 : undefined // If no amount, full refund
    });
    return refund;
  } catch (error) {
    console.error('Error processing refund:', error);
    throw new Error('Failed to process refund');
  }
};
