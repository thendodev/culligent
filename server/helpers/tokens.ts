import { envServer } from '@/global/envServer';
import RefreshToken from '@/models/RefreshToken';
import jwt from 'jsonwebtoken';

export const generateTokens = async (user: any) => {
  if (!envServer.JWT_SECRET || !envServer.JWT_REFRESH_SECRET)
    return Promise.reject('could not create token');
  try {
    //delete old refresh tokens
    await RefreshToken.findOneAndDelete({
      user: user._id,
    });

    //create payload
    const payload = {
      sub: user._id,
    };

    //create a token

    const accessToken = jwt.sign(payload, envServer.JWT_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, envServer.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    //insert new refresh token
    await RefreshToken.insertOne({ token: refreshToken, user: user._id });

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
