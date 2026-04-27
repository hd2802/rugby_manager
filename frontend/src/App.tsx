import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import  { LoginPage }  from "@/pages/auth/login/login";
import { SignupPage } from "@/pages/auth/signup/signup";
import useLeagueStore from "./services/leagueService"
import Layout from "./layout";
import { ThemeProvider } from "@/components/theme-provider" 


function App() {
  /* const { leagues, getLeagues } = useLeagueStore();

  useEffect(() => {
    getLeagues()
  }, [getLeagues])
  */

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <BrowserRouter>
        {/*
          <h1>League List</h1>
          <ul>
            {leagues.map(league => (
              <li key={league.id}>{league.name}</li>
            ))}
          </ul>
        </Layout>
        */}

        <Routes>
          <Route path="/auth/login" element={<LoginPage />}></Route>
          <Route path="/auth/signup" element={<SignupPage />}></Route>
        </Routes>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  )
}

export default App;