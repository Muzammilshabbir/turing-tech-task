import Login from "./containers/Login"
import Auth from "./containers/Auth"
import Dashboard from "./containers/Dashboard"
import ShowCall from "./containers/ShowCall"
import Layout from "./components/Layout"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path="/" element={<Layout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='call/:id' element={<ShowCall/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
