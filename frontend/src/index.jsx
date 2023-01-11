import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Accueil from "./pages/Accueil";
import Signin from "./pages/Signin";
import User from "./pages/User"
import Error404 from "./pages/Error404"
import Error500 from "./pages/Error500"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="signin" element={<Signin />} />
      <Route path="profile" element={<User />} />
      <Route path="error500" element={<Error500 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </BrowserRouter>,
);