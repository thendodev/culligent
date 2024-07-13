import { privateRequest } from '@/lib/requests';
import { TTeam, TTeamInvite } from '@/validations/teams';
enum ETeamsRoutes {
  TEAMS = '/recruitment/business/teams',
  INVITE = `${ETeamsRoutes.TEAMS}/invite`,
}

export const createTeamHandler = async (team: TTeam) => {
  try {
    const { data } = await privateRequest.post(ETeamsRoutes.TEAMS, team);

    return data;
  } catch {
    return [];
  }
};

export const getTeamsHandler = async () => {
  try {
    const { data } = await privateRequest.get(ETeamsRoutes.TEAMS);
    console.log(data);
    return data;
  } catch {
    return [];
  }
};

export const sendInviteHandler = async (invite: TTeamInvite) => {
  try {
    await privateRequest.post(ETeamsRoutes.INVITE, invite);
  } catch {}
};
