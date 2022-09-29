
import {BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import Register from './components/register/register';
import Login from './components/login/login';
import {  CssBaseline  } from '@mui/material';
import Header from "../src/components/generalScreen/Header.js"
import NotFound from "../src/components/generalScreen/NotFound"
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Home from "../src/components/generalScreen/Home.js"
import PrivateRoute from "../src/components/routing/PrivateRoute.js"



const theme = createTheme()
function App() {


  return (
  <Router>
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
      <Routes>
        <Route path='/' element={<HeaderWithChildRoute/>} />
        <Route path='*' element = {<NotFound/> } />
        <Route exact path="/" element={<PrivateRoute/>} >
          <Route exact path='/' element={<Home/>}/> 
        </Route>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/forgetpassword' element={<Login />} />
        <Route exact path='/resetpassword' element={<Login />} />
      </Routes>
    </ThemeProvider>
  </Router>
	);
}

const HeaderWithChildRoute = () =>{
  return (
  <>
  <Header/>
  <Outlet/>
  </>
  )
}
export default App;
