import { TTeam, TTeamInvite } from '@/validations/teams';
import Teams from '@/models/Team';
import { ApiResponse } from '@/global/response.types';
import { baseUrl, EStatusCode } from '@/global/config';
import { ObjectId } from 'mongodb';
import Invites from '@/models/Invites';
import { generateRandomString } from '@/server/helpers/randoms';
import User from '@/models/User';
import { Resend } from 'resend';
import InviteUserEmail from '@/app/templates/team-invite';
import { envServer } from '@/global/envServer';

type TCreateTeamsService = {
  userId: string;
} & TTeam;
export const createTeamsService = async ({
  userId,
  name,
  description,
}: TCreateTeamsService): Promise<ApiResponse<TTeam>> => {
  //create a team in the database
  const team = await Teams.create({
    userId: ObjectId.createFromHexString(userId),
    name,
    description,
  });

  return {
    message: 'Team created',
    success: true,
    code: EStatusCode.Ok,
    data: team,
  };
};

export const getTeamsService = async (
  userId: string,
): Promise<ApiResponse<TTeam[]>> => {
  const teams = await Teams.find({
    userId: ObjectId.createFromHexString(userId),
  });
  if (!teams)
    return {
      message: 'No teams found',
      success: false,
      code: EStatusCode.NotFound,
      data: null,
    };

  return {
    message: 'Teams found',
    success: true,
    code: EStatusCode.Ok,
    data: teams,
  };
};

export const createInviteService = async (
  teamId: ObjectId,
  userId: ObjectId,
): Promise<ApiResponse<TTeamInvite>> => {
  //create an invite in the database

  const inviteHash = generateRandomString();

  const invite = await Invites.create({
    userId,
    teamId,
    inviteHash,
  });

  return {
    message: 'Invite created',
    success: true,
    code: EStatusCode.Ok,
    data: invite,
  };
};

export const sendInviteService = async ({
  userId,
  teamId,
  inviteHash,
}: TTeamInvite): Promise<ApiResponse<null>> => {
  //find user in database

  const invitedBy = await User.findById(userId);
  const team = await Teams.findById(teamId);

  if (!invitedBy || !team) {
    return {
      message: 'Invite not sent',
      success: false,
      code: EStatusCode.NotFound,
      data: null,
    };
  }

  const resend = new Resend(envServer.INVITE_RESEND);

  const { data, error } = await resend.emails.send({
    from: 'you@example.com',
    to: 'user@gmail.com',
    subject: 'hello world',
    react: InviteUserEmail({
      teamName: team.name,
      invitedByEmail: invitedBy.email,
      inviteLink: `${baseUrl}/teams/accept-invite/${inviteHash}`,
      username: 'user',
      invitedByUsername: 'invitedBy',
    }),
  });

  if (error) {
    return {
      message: 'Invite not sent',
      success: false,
      code: EStatusCode.NotFound,
      data: null,
    };
  }

  return {
    message: 'Invite sent',
    success: false,
    code: EStatusCode.NotFound,
    data: null,
  };
};
