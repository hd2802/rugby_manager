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
import useLeagueStore from "@/features/createNewSave/stores/leagueStore";
import { TeamGrid } from "@/features/createNewSave/components/team-grid";

export function SelectTeam() {
    const { leagues, getLeagues } = useLeagueStore();
    const [searchTeam, setSearchTeam] = useState("");
    const [searchLeague, setSearchLeague] = useState("");

    useEffect(() => {
        getLeagues();
    }, [getLeagues]);

    if (!leagues || leagues.length === 0) {
        return <div>No teams found</div>;
    }

    const filteredLeagues = leagues
        .filter(league => searchLeague == "All Leagues" ? league : league.name == searchLeague)
        .map((league) => ({
            ...league,
            teams: league.teams.filter((team) =>
                team.name.toLowerCase().includes(searchTeam.toLowerCase()),
            ),
        }))
        .filter((league) => league.teams.length > 0);

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
            <TeamGrid leagues={filteredLeagues} />
        </div>
    );
}
