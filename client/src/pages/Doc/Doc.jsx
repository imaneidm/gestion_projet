import "./doc.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"


const Doc = () => {
  return (
    <div className="Doc">
      <Sidebar/>
      <div className="docContainer">
        <Navbar/>
        <h1>Page de documents</h1>
      </div>
    </div>
  )
}

export default Doc