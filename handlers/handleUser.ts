import { privateRequest } from '@/lib/requests';
import { toast } from '@/components/ui/use-toast';

export const handleUserAccount = async () => {
  try {
    await privateRequest.get('/user/account');
    toast({ title: 'Account', description: 'Account updated' });
  } catch (e) {}
};
