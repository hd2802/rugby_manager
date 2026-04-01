import { useEffect } from 'react';
import useLeagueStore from "../src/services/leagueService"
import Layout from "./layout";


function App() {
  const { leagues, getLeagues } = useLeagueStore();

  useEffect(() => {
    getLeagues()
  }, [getLeagues])

  return (
    <Layout>
      <h1>League List</h1>
      <ul>
        {leagues.map(league => (
          <li key={league.id}>{league.name}</li>
        ))}
      </ul>
    </Layout>
  )
}

export default App;