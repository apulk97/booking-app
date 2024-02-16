import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

function Home() {
  const profile = localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile') || '')
  const name: string = profile?.name || ''
  const {authData} = useSelector((state: RootState) => state.auth)
  
  return (
    <>
    {Boolean(name) && <div>Hi, {name}</div>}
    {/* <Link to="/signin">Sign in</Link> */}
    </>
  )
}

export default Home