import { toast } from '@/components/ui/use-toast';
import { ClientErrorResponse } from '@/global/response.types';
import { privateRequest } from '@/lib/requests';
import { TTeamsAPi } from '@/server/routes/recruitment/business/teams/teams';
import { TTeam } from '@/validations/teams';
import { AxiosError } from 'axios';
enum ETeamsRoutes {
  TEAMS = '/recruitment/business/teams',
}

export const createTeamHandler = async (team: TTeam) => {
  try {
    const { data } = await privateRequest.post<TTeamsAPi>(
      ETeamsRoutes.TEAMS,
      team,
    );

    return data;
  } catch (e) {
    const { response } = e as AxiosError<ClientErrorResponse>;
    toast({
      title: 'Teams',
      description: response?.data.message,
    });
    return [];
  }
};

export const getTeamsHandler = async () => {
  try {
    const { data } = await privateRequest.get(ETeamsRoutes.TEAMS);
    console.log(data);
    return data;
  } catch (e) {
    const { response } = e as AxiosError<ClientErrorResponse>;

    toast({
      title: 'Teams',
      description: response?.data.message,
    });
    return [];
  }
};
