import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../components/AccountNav"

export default function AccountPage() {
  const {user, setUser, ready} = useContext(AuthContext)
  const [redirect, setRedirect] = useState(null)
  const {pathname} = useLocation()

  const logout = async () => {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if(!ready) {
    return 'Loading...'
  }

  if(ready && !user && !redirect){
    return <Navigate to={'/login'} />
  }

  if(redirect){
    return <Navigate to={redirect} />
  }

  let subpage = pathname.split('/')?.[2]
  if(subpage === undefined){
    subpage = 'profile'
  }
  const linkClasses = (type = null) => {
    let classes = 'inline-flex gap-1 py-2 px-6 rounded-full'
    if(type === subpage){
      classes += ' bg-primary text-white'
    } else {
      classes += ' bg-gray-200'
    }
    return classes
  }

  return (
    <div>
      <AccountNav 
        linkClasses = {linkClasses} 
      />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  )
}
