import { toast } from '@/components/ui/use-toast';
import { privateRequest } from '@/lib/requests';
import { MProfile } from '@/models/Profile';

class _profileHandler {
  createProfile = async (data: MProfile) => {
    try {
      await privateRequest.post('/profile', data);
      toast({ title: 'Profile', description: 'Profile created' });
    } catch (e) {
      toast({
        title: 'Profile',
        description: 'Profile not created',
        variant: 'destructive',
      });
    }
  };
  mutateProfile = async (data: MProfile) => {
    try {
      await privateRequest.patch('/profile', data);
      toast({ title: 'Profile', description: 'Profile updated' });
    } catch (e) {
      toast({
        title: 'Profile',
        description: 'Profile not updated',
        variant: 'destructive',
      });
    }
  };
}

export const profileHandler = new _profileHandler();
