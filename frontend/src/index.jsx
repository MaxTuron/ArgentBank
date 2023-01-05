import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Accueil from "./pages/Accueil";
import Signin from "./pages/Signin";
import User from "./pages/User"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="signin" element={<Signin />} />
      <Route path="user" element={<User />} />
    </Routes>
  </BrowserRouter>,
);
