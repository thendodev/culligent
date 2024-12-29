// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { teamInviteSchema, TTeamInvite } from '@/validations/teams';
// import { sendInviteHandler } from '@/handlers/handleTeam';

// type TCreateTeamMemberProps = {
//   teamId: string | undefined | null;
//   name: string | undefined | null;
// };

// const InviteTeamMember = ({ teamId, name }: TCreateTeamMemberProps) => {
//   const form = useForm<TTeamInvite>({
//     mode: 'onBlur',
//     defaultValues: {
//       teamId: teamId ?? '',
//     },
//     resolver: zodResolver(teamInviteSchema),
//   });

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button disabled={teamId ? false : true} variant="outline">
//           Add New Member
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="w-full">
//         <Tabs defaultValue="account" className="w-[400px] mx-auto">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="Search">Add existing</TabsTrigger>
//             <TabsTrigger value="Invite">Invite new</TabsTrigger>
//           </TabsList>
//           <TabsContent value="Search" className="mx-auto">
//             <DialogHeader>
//               <DialogTitle>Search an existing team member</DialogTitle>
//               <DialogDescription>
//                 Search for a team member or invite a team member to join {name}.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4"></div>
//             <DialogFooter>
//               <Button type="submit">Add changes</Button>
//             </DialogFooter>
//           </TabsContent>
//           <TabsContent value="Invite">
//             <DialogHeader>
//               <DialogTitle>Send an invite to join {name}</DialogTitle>
//               <DialogDescription>
//                 Send an email invite to a new team member to join {name}.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(sendInviteHandler)}>
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="johnDoe@culligent.com"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormDescription />
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <DialogFooter>
//                     <DialogClose asChild>
//                       <Button type="submit">Send Invite</Button>
//                     </DialogClose>
//                   </DialogFooter>
//                 </form>
//               </Form>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default InviteTeamMember;
