import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type TCreateTeamMemberProps = {};

const InviteTeamMember = ({}: TCreateTeamMemberProps) => {
  const form = useForm<any>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
    },
    // resolver: zodResolver(),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new team member</DialogTitle>
          <DialogDescription>
            Search for a team member or invite a team member to join your team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form className="grid grid-cols-4 items-center gap-4"></form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteTeamMember;
