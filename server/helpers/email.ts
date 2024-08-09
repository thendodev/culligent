import { envServer } from '@/global/envServer';

export const getEmail = (email: string) => {
  const env = envServer.NEXT_PUBLIC_ENVIRONMENT;
  if (env === 'production' || env === 'uat') return email;
  return 'delivered@resend.dev';
};
