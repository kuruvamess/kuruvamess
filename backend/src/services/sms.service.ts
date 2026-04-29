import twilio from 'twilio';

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// In-memory OTP storage (use Redis in production)
const otpStore = new Map<string, { otp: string; expires: Date }>();

export const sendSMS = async (to: string, body: string) => {
  try {
    // Format phone number for India
    const formattedPhone = to.startsWith('+91') ? to : `+91${to}`;
    
    const message = await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });

    console.log(`SMS sent successfully: ${message.sid}`);
    return message;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS');
  }
};

export const generateOTP = (): string => {
  // Generate 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = (phone: string, otp: string) => {
  // Store OTP with 10-minute expiry
  const expires = new Date(Date.now() + 10 * 60 * 1000);
  otpStore.set(phone, { otp, expires });
  
  // Clean up expired OTPs
  cleanupExpiredOTPs();
};

export const verifyOTPCode = async (phone: string, inputOTP: string): Promise<boolean> => {
  const storedData = otpStore.get(phone);
  
  if (!storedData) {
    return false;
  }
  
  if (new Date() > storedData.expires) {
    otpStore.delete(phone);
    return false;
  }
  
  if (storedData.otp === inputOTP) {
    otpStore.delete(phone); // Remove OTP after successful verification
    return true;
  }
  
  return false;
};

const cleanupExpiredOTPs = () => {
  const now = new Date();
  for (const [phone, data] of otpStore.entries()) {
    if (now > data.expires) {
      otpStore.delete(phone);
    }
  }
};
