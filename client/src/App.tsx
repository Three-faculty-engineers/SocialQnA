import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/login/Login';
import NavbarMain from './common/Navbar';
import { Register } from './auth/register/Register';

function App() {
  return (
    <>
    <NavbarMain />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
