import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Accueil from "./pages/Accueil";
import Error from "./pages/Error"
import Select from "./pages/Select"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Select />} />
      <Route path="/:userId" element={<Accueil />} />
      <Route path="*" element={<Error />}/>
    </Routes>
  </BrowserRouter>,
);
