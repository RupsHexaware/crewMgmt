import "./list.scss"
import Sidebar from "../../components/sidebar/TransportSidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/DriverDatatable"

const CabDriversList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default CabDriversList