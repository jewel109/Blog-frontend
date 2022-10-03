import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import {Link as Rlink, useNavigate} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {useState} from "react"
import api from "../../services/api.js"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data =  new FormData(event.currentTarget);
    const email = await data.get('email')
    const password = await data.get('password')
      
    console.log( email, password);

    try{

      const {data} = await api.post("/auth/login",{email,password})

      localStorage.setItem("authToken",data.token)

      setTimeout(() => {
        navigate('/')
      },1800)

    }catch(error){
      setError(error.response.data.error)
      setTimeout(() => {
        setError("")
      },4500)
    }
    
  };

  return (
			<Container component='main' maxWidth='xs'>
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
							autoComplete='email'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
              //onClick={(e) => navigate('/login')}
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							log in
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
									<Rlink to="/register">Don't have an account? Register </Rlink>
							</Grid>
						</Grid>
					</Box>
				</Box>
        <Box>
          <Button 
            fullWidth
            variant='text'
            onClick={(e) => navigate('/')}
            sx={{marginTop:8,color:"purple"}}
          >
           go home 
          </Button>
        </Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
	);
}
