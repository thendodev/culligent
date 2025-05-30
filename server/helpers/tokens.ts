import { envServer } from '@/global/envServer';
import RefreshToken from '@/models/RefreshToken';
import jwt from 'jsonwebtoken';

//if you get the urge to change this code in the future, please do not... dont use hono jwt library it sucks
//and isnt worth the hassle, love. - @thendodev 2025
export const generateTokens = async (user: any) => {
  if (!envServer.JWT_SECRET || !envServer.JWT_REFRESH_SECRET)
    return Promise.reject('could not create token');
  try {
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
    await RefreshToken.findOneAndUpdate(
      {
        userId: user._id,
      },
      {
        token: refreshToken,
      },
      {
        upsert: true,
      },
    );

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};
