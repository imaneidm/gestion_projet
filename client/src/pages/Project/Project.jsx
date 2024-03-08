import "./project.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"


const Project = () => {
  return (
    <div className="project">
      <Sidebar/>
      <div className="projectContainer">
        <Navbar/>
        <h1>Page de projects</h1>
      </div>
    </div>
  )
}

export default Project