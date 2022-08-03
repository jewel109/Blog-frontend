
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import SignUp from './components/siginup/signup';
import SignIn from './components/signin/signin';
import { Box, CssBaseline  } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const theme = createTheme()
function App() {

  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
      <Box>hei</Box>
      <Typography variant="h1" component="div" gutterBottom>
        h1. Heading
      </Typography> 
      <Button>jewel</Button>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </ThemeProvider>
	);
}

export default App;
