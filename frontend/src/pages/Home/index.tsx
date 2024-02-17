import { useSelector } from "react-redux"
import { RootState } from "../../store"

function Home() {
  const profile = localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile') || '')
  const name: string = profile?.name || ''
  const {authData} = useSelector((state: RootState) => state.auth)
  
  return (
    <>
    {Boolean(name) ? <h2 className="text-2xl font-bold">Welcome, {name}</h2> : <span className="text-xl">Please sign in to add your own hotels</span>}
    </>
  )
}

export default Home