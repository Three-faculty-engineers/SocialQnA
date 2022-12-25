import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/login/Login';
import NavbarMain from './common/Navbar';
import { Register } from './auth/register/Register';
import Home from './common/Home';
import { Profile } from './user/Profile';
import { Error404 } from './common/Error404';

function App() {
  return (
    <>
    <NavbarMain />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile/:id" element={ <Profile />}></Route>
        <Route path="/error404" element={<Error404 />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
