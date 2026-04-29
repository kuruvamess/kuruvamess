import { Response } from 'express';
import { IUser } from '../models/User.model';

export const sendTokenResponse = (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + (parseInt(process.env.COOKIE_EXPIRE || '7') * 24 * 60 * 60 * 1000)
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      status: 'success',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
};
