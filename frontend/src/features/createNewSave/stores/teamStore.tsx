import { create } from "zustand";
import axios from "axios"
import type { Team } from "@/types/types"

interface TeamState {
    teams: Team[],
    getTeams: () => void;
}

const PORT = import.meta.env.VITE_BACKEND_PORT || 8000

const useTeamStore = create<TeamState>((set) => ({
    teams: [],
    getTeams: async () => {
        const response = await axios.get(`http://localhost:${PORT}/api/teams`);
        console.log(response.data)
        set({ teams: response.data})
    }
}))

export default useTeamStore;