import { z } from 'zod';
import { objectIdValidator } from './mongoose';

export const teamMembersSchema = z
  .object({
    userId: objectIdValidator,
  })
  .transform(() => {
    return z.object({
      userId: objectIdValidator,
      name: z.string().min(1).max(100),
      email: z.string().email(),
    });
  });

export const teamInviteSchema = z.object({
  userId: objectIdValidator,
  teamId: objectIdValidator,
  inviteHash: z.string().min(1).max(100),
  status: z.string().min(1).max(100),
  isValid: z.boolean(),
});
export const teamsSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  members: z.array(teamMembersSchema),
  userId: objectIdValidator,
});
export type TTeam = z.infer<typeof teamsSchema>;
export type TTeamMembers = z.infer<typeof teamMembersSchema>;
export type TTeamInvite = z.infer<typeof teamInviteSchema>;
