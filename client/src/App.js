import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css'
import Register from './components/auth/register'
import Login from './components/auth/login'
import ForgotPassword from './components/auth/forgotpassword'
import ResetPassword from './components/auth/resetpassword'
import { CssBaseline } from '@mui/material'
import Header from '../src/components/generalScreen/Header.js'
import NotFound from '../src/components/generalScreen/NotFound'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Home from '../src/components/generalScreen/Home.js'
import PrivateRoute from '../src/components/routing/PrivateRoute.js'
import Profile from './components/Profile/Profile.js'

const theme = createTheme()
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<HeaderWithChildRoute />}>
            <Route path='*' element={<NotFound />} />
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/' element={<Home />} />
            </Route>
            <Route exact path='profile' element={<Profile />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/forgotpassword' element={<ForgotPassword />} />
            <Route exact path='/resetpassword' element={<ResetPassword />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

const HeaderWithChildRoute = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
export default App
