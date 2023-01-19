import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistStor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Accueil from "./pages/Accueil";
import Signin from "./pages/Signin";
import User from "./pages/User"
import Error401 from "./pages/Error401"
import Error404 from "./pages/Error404"
import Error500 from "./pages/Error500"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistStor}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="signin" element={<Signin />} />
        <Route path="profile" element={<User />} />
        <Route path="error500" element={<Error500 />} />
        <Route path="error401" element={<Error401 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
    </PersistGate>
  </Provider>,
);