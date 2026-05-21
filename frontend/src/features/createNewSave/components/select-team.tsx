import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import useTeamStore from "@/features/createNewSave/stores/teamStore";
import { TeamGrid } from "@/features/createNewSave/components/team-grid";
import type { Team } from "@/types/types"

export function SelectTeam() {
    const { teams, getTeams } = useTeamStore();
    const [searchTeam, setSearchTeam] = useState("");
    const [searchLeague, setSearchLeague] = useState("All Leagues");
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    useEffect(() => {
        getTeams();
    }, [getTeams]);

    if (!teams || teams.length === 0) {
        return <div>No teams found</div>;
    }

    const filteredTeams = teams
        .filter((team: Team) =>
            team.league &&
            (searchLeague === "All Leagues" || team.league.name === searchLeague) &&
            team.name.toLowerCase().includes(searchTeam.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    
    const handleSelectTeam = (team: Team) => {
        setSelectedTeam(team);
    };

    return (
        <div>
            <div className="mb-4 flex flex-col md:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Search by team name"
                    value={searchTeam}
                    onChange={(e) => setSearchTeam(e.target.value)}
                    className="border p-2 rounded-xl w-full"
                />
                <div className="w-auto">
                    <Select 
                        onValueChange={(value) => (setSearchLeague(value))}
                    >
                        <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder="Select a league" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Leagues</SelectLabel>
                            <SelectItem value="All Leagues">All Leagues</SelectItem>
                            <SelectItem value="Premiership Rugby">Premiership Rugby</SelectItem>
                            <SelectItem value="URC">URC</SelectItem>
                            <SelectItem value="Top 14">Top 14</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <TeamGrid 
                teams={filteredTeams} 
                handleSelectTeam={handleSelectTeam}
                selectedTeam={selectedTeam}
            />
        </div>
    );
}
