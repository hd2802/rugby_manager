import { create } from "zustand";
import axios from "axios"
import type { TeamState } from "@/types/types"

const PORT = import.meta.env.VITE_BACKEND_PORT || 8000

const useLeagueStore = create<TeamState>((set) => ({
    leagues: [],
    getLeagues: async () => {
        const response = await axios.get(`http://localhost:${PORT}/api/leagues`);
        console.log(response.data)
        set({ leagues: response.data})
    }
}))

export default useLeagueStore;