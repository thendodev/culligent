import { z } from 'zod';

export const teamsSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
});

export const teamMembersSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().min(1).max(100),
});
export const teamInviteSchema = z.object({
  email: z.string().email(),
  teamId: z.string().min(1).max(100),
});

export type TTeam = z.infer<typeof teamsSchema>;
export type TTeamMembers = z.infer<typeof teamMembersSchema>;
export type TTeamInvite = z.infer<typeof teamInviteSchema>;
