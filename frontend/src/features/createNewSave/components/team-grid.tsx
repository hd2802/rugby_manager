import { TeamCard } from "@/features/createNewSave/components/team-card";
import type { TeamGridProps } from "@/types/types";

export function TeamGrid({ teams, handleSelectTeam, selectedTeam }: TeamGridProps) {
    if (!teams || teams.length === 0) {
        return <div className="flex justify-center">No teams found - please refine search</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teams.flatMap((team) =>
                <TeamCard 
                    key={team.id} 
                    teamData={team} 
                    leagueName={team.league.name} 
                    handleSelectTeam={handleSelectTeam}
                    selectedTeam={selectedTeam}
                />
            )}
        </div>
    );
}
