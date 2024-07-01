'use client';

import { useEffect, useState } from 'react';
import PageWrapper from '../components/page-wrapper';
import TeamSwitcher from './components/teams-select';
import { getTeamsHandler } from '@/handlers/handleTeam';
import { MTeam } from '@/models/Teams';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import InviteTeamMember from './components/add-team-member';

type TTeamsProps = {};

const Teams = ({}: TTeamsProps) => {
  const [teams, setTeams] = useState<MTeam[] | null>();
  const [selectedTeam, setSelectedTeam] = useState<MTeam>();

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await getTeamsHandler();
      setTeams(data);
    };

    fetchTeams();
  }, []);

  const onTeamSelect = (team: MTeam) => {
    setSelectedTeam(team);
  };

  return (
    <PageWrapper title={'Teams'} description={''}>
      <div className="flex w-full h-full">
        <div className="flex flex-col gap-4">
          <p className="text-2xl">Teams</p>
          <div className="flex flex-col gap-2 h-full p-12">
            <TeamSwitcher
              onTeamSelect={onTeamSelect}
              selectedTeam={selectedTeam}
              teams={teams}
            />
            <InviteTeamMember />
            <div className="space-y-2 p-2  border border-[var(--cruto-border)] rounded-[var(--cruto-radius)]">
              <p className="text-[var(--cruto-text)]">existing members</p>

              {selectedTeam?.members?.map((team) => (
                <div
                  className="flex align-middle items-center p-2 shadow-sm rounded-[var(--cruto-radius)]"
                  key={team?.email}
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${team.email}.png`}
                      alt={team.name}
                      className="grayscale"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {team?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Teams;
