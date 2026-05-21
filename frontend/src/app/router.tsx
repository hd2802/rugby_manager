import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CreateNewSave } from "@/app/pages/CreateNewSave";

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/save/new" element={<CreateNewSave />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router;