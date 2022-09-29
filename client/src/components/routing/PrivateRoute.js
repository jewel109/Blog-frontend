import axios from "axios"
import { useContext, useEffect, useState } from "react"
import {Outlet, useNavigate} from "react-router-dom"
import {AuthContext} from "../../context/authcontext"
import Home from "../generalScreen/Home.js"

const baseUrl = "http://localhost:5000"
const PrivateRoute = () => {
  const bool = localStorage.getItem("authToken") ? true : false
  const [auth, setAuth] = useState(bool)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {setActiveUser, setConfig} = useContext(AuthContext)

  useEffect(() => {
    const controlAuth = async () => {
      
      const config = {
        "Content-Type":"application/json",
        authorization:`Bearer ${localStorage.getItem("authToken")}`
      }
      
      try{

        const {data} = await axios.get(`${baseUrl}/auth/private`,config)
        setAuth(true)
        setActiveUser(data.user)
        setConfig(config)

      }catch(error){
        localStorage.removeItem("authToken")

        setAuth(false)
        setActiveUser({})
        navigate("/")
      
        setError("You are not authorized . please login. ")
      }

    }
    controlAuth()
  },[bool,navigate])

  return (auth ? <Outlet/> : <Home/>)
}

export default PrivateRoute
