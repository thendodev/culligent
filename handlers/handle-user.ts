import { privateRequest } from '@/lib/requests';

enum EUserRoutes {
  Account = '/user/account',
  settings = '/user/settings',
}
export const handleUserAccount = async () => {
  await privateRequest.get('/user/account');
};

export const handleCreateUserSettings = async () => {
  const { data } = await privateRequest.post('/user/settings');
  return data;
};
export const handleGetUserSettingsByUserId = async () => {
  const { data } = await privateRequest.get('/user/settings');
  return data;
};
