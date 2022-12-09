import React,{useState,useEffect} from "react"
import api from "../services/api.js"
export const AuthContext = React.createContext()

const AuthContextProvider = props => {
  const [activeUser, setActiveUser] = useState({})
  const [config,setConfig] = useState({
    headers:{
      "Content-Type":"application/json",
      authorization:`Bearer ${localStorage.getItem("authToken")}`
    }
  })

  useEffect(() => {
    const controlAuth = async () => {
      try {
        const {data} = await api.get("/auth/private",config)

        console.log(`in AuthContextjs ${data.message}`)

        setActiveUser(data.user)
      }
      catch(error) {

        console.log(`error in AuthContext`)

        localStorage.removeItem("authToken")
        
        setActiveUser({})
      }
    }
    controlAuth()
  },[])

    return (
    <AuthContext.Provider value= {{activeUser,setActiveUser,config,setConfig}}>
      {props.children}
    </AuthContext.Provider>
    )
};


export default AuthContextProvider
