import { toast } from '@/components/ui/use-toast';
import { privateRequest } from '@/lib/requests';
import { MProfile } from '@/models/Profile';

export const createProfile = async (data: MProfile) => {
  try {
    await privateRequest.post('/profile', data);
    toast({ title: 'Profile', description: 'Profile created' });
  } catch {}
};
export const mutateProfile = async (data: MProfile) => {
  try {
    await privateRequest.patch('/profile', data);
    toast({ title: 'Profile', description: 'Profile updated' });
  } catch (e) {}
};
