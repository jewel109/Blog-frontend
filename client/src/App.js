
import {BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import SignUp from './components/siginup/signup';
import SignIn from './components/signin/signin';
import {  CssBaseline  } from '@mui/material';
import Header from "../src/components/generalScreen/Header.js"
import NotFound from "../src/components/generalScreen/NotFound"
import { createTheme,ThemeProvider } from '@mui/material/styles';
const theme = createTheme()
function App() {


  return (
  <Router>
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
      <Routes>
        <Route path='/' element={<HeaderWithChildRoute/>} />
        <Route path='*' element = {<NotFound/> } />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
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
