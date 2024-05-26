import Cookies from 'js-cookie';

export const useUser = () => {
  if (!Cookies.get('cruto-user')) return null;
  const currentUser = Cookies.get('cruto-user');

  return currentUser;
};
