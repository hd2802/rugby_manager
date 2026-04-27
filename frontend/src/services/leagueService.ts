import { create } from "zustand";
import axios from "axios"

type League = {
    id: number,
    name: string
}

interface LeagueState {
    leagues: League[],
    getLeagues: () => void;
}

const PORT = import.meta.env.VITE_BACKEND_PORT || 3001

const useLeagueStore = create<LeagueState>((set) => ({
    leagues: [],
    getLeagues: async () => {
        const response = await axios.get(`http://localhost:${PORT}/api/leagues`);
        set({ leagues: response.data})
    }
}))

export default useLeagueStore;