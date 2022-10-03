import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import {Link as Rlink, useNavigate} from "react-router-dom"
import Link from "@mui/material/Link";
import {  ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useState} from "react"
import api from "../../services/api"

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{"Copyright © "}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}


export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()


	const handleSubmit = async (event) => {
		event.preventDefault();
	  const data =  new FormData(event.currentTarget);
    const username = await data.get('username')
    const email = await data.get('email')
    const password = await data.get('password')
    const confirmPassword = await data.get('confirmPassword')
      

    console.log( username, email, password);
    if (password !== confirmPassword) {
      setPassword("")
      setConfirmPassword("")
      setTimeout(()  => {
        setError("")
      },8000)
    }
    try {
      const {data} = await api.post(
        "/auth/register",
        {username,email,password}
      )
      
      console.log(data)
      localStorage.setItem("authToken",data.token)

      setTimeout(() => {
        navigate('/')
      },1800)
    } catch (error) {
      console.log(error)
      setError(error)
      setTimeout(() => {
        setError("")
      },6000)
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
						Sign Up
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
							id='username'
							label='username'
							name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
							autoComplete='email'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
							autoComplete='email'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
							autoComplete='current-password'
						/>
            <TextField
							margin='normal'
							required
							fullWidth
							name='confirmPassword'
							label='confirmPassword'
							type='confirmPassword'
							id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete='current-password'
						/>
						
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
						<Grid container>
							
							<Grid item>
								<Link variant='body2'>
								<Rlink to="/login">"Already have an account? Log In </Rlink>
								</Link>
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
