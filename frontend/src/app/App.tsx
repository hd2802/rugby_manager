import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Layout from "./layout";
import Provider from "./provider";
import Router from "./router";


function App() {
  return (
    <Provider>
      <Layout>
        <Router />
      </Layout>
    </Provider>
  )
}

export default App;