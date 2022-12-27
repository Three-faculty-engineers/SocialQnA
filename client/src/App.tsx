import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/login/Login';
import NavbarMain from './common/Navbar';
import { Register } from './auth/register/Register';
import Home from './common/Home';
import { Profile } from './user/Profile';
import { Error404 } from './common/Error404';
import { useEffect, useState } from 'react';
import { getAuthInfo } from './service/auth.service';
import { Settings } from './user/Settings';
import { IsAuth } from './guard/IsAuth';

function App() {

  const [auth, setAuth] = useState({});

  async function getAuth()
  {
    const result = await getAuthInfo();

    if(!result.success)
    {
      return;
    }

    setAuth(result.data);
  }

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
    <NavbarMain user={auth} />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile/:id" element={ <Profile />}></Route>
        <Route path="/error404" element={<Error404 />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
