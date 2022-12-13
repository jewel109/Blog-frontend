import { useContext } from 'react'
import { AuthContext } from '../../context/authcontext'

export default function Profile() {
  const { activeUser } = useContext(AuthContext)
  activeUser ? console.log(`in Profile user=${activeUser.username}`): console.log("activeUser is none")
  return (
    <>
      <h2>activeUser.username </h2>
      <h3> activeUser.email</h3>
    </>
  )
}
