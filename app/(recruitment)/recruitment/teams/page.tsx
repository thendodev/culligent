'use client';

import { useState } from 'react';
import PageWrapper from '../components/page-wrapper';
import TeamSwitcher from './components/teams-select';
import { getTeamsHandler } from '@/handlers/handleTeam';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import InviteTeamMember from './components/add-team-member';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { TTeam } from '@/validations/teams';
import { TWithId } from '@/global/types';

type TTeamsProps = {};

const Teams = ({}: TTeamsProps) => {
  const [selectedTeam, setSelectedTeam] = useState<TWithId<TTeam>>();

  const { data } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => getTeamsHandler(),
  });

  const onTeamSelect = (team: TWithId<TTeam>) => {
    setSelectedTeam(team);
  };

  return (
    <PageWrapper title={'Teams'} description={''}>
      <div className="h-fit flex gap-4 items-center">
        <TeamSwitcher
          onTeamSelect={onTeamSelect}
          selectedTeam={selectedTeam}
          teams={data}
        />
        <InviteTeamMember
          name={selectedTeam?.name}
          teamId={selectedTeam?._id as string}
        />
      </div>
      <div className="flex flex-row gap-2 h-full w-full mt-5">
        <div className="space-y-2 mx-10">
          <p className="text-[var(--cruto-text)]">existing members</p>
          <div className="w-full h-full border border-[var(--cruto-border)] rounded-[var(--cruto-radius)]">
            {selectedTeam?.members?.map((team) => (
              <div
                className="flex align-middle items-center p-2 shadow-sm rounded-[var(--cruto-radius)]"
                key={team?.email}
              >
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${team}.png`}
                    alt={team}
                    className="grayscale"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {team?.name}
              </div>
            ))}
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="h-full w-[2px] bg-[var(--cruto-border)]"
        />
        <div></div>
      </div>
    </PageWrapper>
  );
};

export default Teams;
