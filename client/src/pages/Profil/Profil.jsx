import "./profil.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"


const Profil = () => {
  return (
    <div className="profil">
      <Sidebar/>
      <div className="profilContainer">
        <Navbar/>
        <h1>Page de profil</h1>
      </div>
    </div>
  )
}

export default Profil