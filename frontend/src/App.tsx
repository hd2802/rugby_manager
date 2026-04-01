import { useEffect } from 'react';
import useLeagueStore from "../src/services/leagueService"


function App() {
  const { leagues, getLeagues } = useLeagueStore();

  useEffect(() => {
    getLeagues()
  }, [getLeagues])

  return (
      <main className="bg-base text-text-primary h-screen">
      <h1>League List</h1>
      <ul>
        {leagues.map(league => (
          <li key={league.id}>{league.name}</li>
        ))}
      </ul>
    </main>
  )
}

export default App;