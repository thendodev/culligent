import { envServer } from '@/global/envServer';
import RefreshToken from '@/models/RefreshToken';
import { sign } from 'hono/jwt';

export const generateTokens = async (user: any) => {
  if (!envServer.JWT_SECRET || !envServer.JWT_REFRESH_SECRET)
    return Promise.reject('could not create token');
  try {
    //create payload
    const AccessPayload = {
      sub: user._id,
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    };
    const RefreshPayload = {
      sub: user._id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    };

    //create access token
    const accessToken = await sign(
      AccessPayload,
      envServer.JWT_SECRET,
      'HS256',
    );

    //create refresh token
    const refreshToken = await sign(
      RefreshPayload,
      envServer.JWT_REFRESH_SECRET,
      'HS256',
    );
    //remove pre-existing user refresh token
    await RefreshToken.findOneAndDelete({
      user: user._id,
    });

    //insert new refresh token
    await RefreshToken.insertOne({ token: refreshToken, user: user._id });

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
