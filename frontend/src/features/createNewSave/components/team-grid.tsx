import { TeamCard } from "@/features/createNewSave/components/team-card";
import type { TeamGridProps } from "@/types/types";

export function TeamGrid({ leagues }: TeamGridProps) {
    if (!leagues || leagues.length === 0) {
        return <div className="flex justify-center">No teams found - please refine search</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leagues.flatMap((league) =>
                league.teams.map((team) => (
                    <TeamCard key={team.id} teamData={team} leagueName={league.name}/>
                )),
            )}
        </div>
    );
}
