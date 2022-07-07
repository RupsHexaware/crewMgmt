
import Sidebar from "../../components/sidebar/TransportSidebar";
import TransprtNavbar from "../../components/navbar/TransportNavbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";

const Home = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  //console.log(user)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <TransprtNavbar />
        <div className="widgets">
          {/* <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Taxi Driver Registered</div>
          {/* <Table /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
