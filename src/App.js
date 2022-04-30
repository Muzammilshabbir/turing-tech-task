import { useCallback, useEffect, useRef } from "react";
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
import Loader from './components/Loader'
import './App.css';
import { Axios } from './services/Axios'

function App() {

  const intervalRef = useRef();

  const getToken = useCallback(async () => {

    const { data } = await Axios.post('auth/refresh-token')
    const { access_token } = data
    localStorage.setItem('_token', access_token)
    return access_token
  }, []);

  useEffect(() => {
    const interval = setInterval(() => getToken(), 100000);
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [getToken]);


  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Loader />
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route path="/" element={<Layout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='call/:id' element={<ShowCall />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
