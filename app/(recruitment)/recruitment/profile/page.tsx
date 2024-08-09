import PageWrapper from '../components/page-wrapper';
import ProfileForm from './components/profile-form';
import { Dbconnect, Dbdisconnect } from '@/lib/database/papr';
import { toast } from '@/components/ui/use-toast';
import Profile from '@/models/Profile';
import { useUserServer } from '@/lib/useUserServer';

const ProfilePage = async () => {
  // await Dbconnect();
  // const user = await useUserServer();
  // const profile = await Profile.findOne({ user: user?.email })
  //   .catch(() => {
  //     toast({ title: 'Error', description: 'Error fetching profile' });
  //     return null;
  //   })
  //   .finally(async () => {
  //     await Dbdisconnect();
  //   });
  // return (
  //   <PageWrapper title="Profile" description="Profile Settings">
  //     <ProfileForm profile={profile} />
  //   </PageWrapper>
  // );
};

export default ProfilePage;
