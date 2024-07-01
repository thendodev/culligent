import { TTeam } from '@/validations/teams';
import Teams, { MTeam } from '@/models/Teams';
import { ApiResponse } from '@/global/response.types';
import { EStatusCode } from '@/global/config';
import { ObjectId } from 'mongodb';

type TCreateTeamsService = {
  userId: string;
} & TTeam;
export const createTeamsService = async ({
  userId,
  name,
  description,
}: TCreateTeamsService): Promise<ApiResponse<MTeam>> => {
  const team = await Teams.insertOne({
    userId: ObjectId.createFromHexString(userId),
    name,
    description,
  });
  if (!team)
    return {
      message: 'Team not created',
      success: false,
      code: EStatusCode.NotModified,
      data: null,
    };

  return {
    message: 'Team created',
    success: true,
    code: EStatusCode.Ok,
    data: team,
  };
};

export const getTeamsService = async (
  userId: string,
): Promise<ApiResponse<MTeam[]>> => {
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
