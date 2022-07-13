import "./datatable.scss";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { driverColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userInputs } from "../../formSource";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import Edituser from "../../pages/edit/EditUser";

const DriverDatatable = () => {
  const [data, setData] = useState([]);
  const [editBox , seteditBox] = useState(false);

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "cabDrivers"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "crewDetails", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to={`/airline/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={() => seteditBox(true)}>Edit</div>
              {editBox === true && <Edituser userData={data} seteditBox = {seteditBox} inputs={userInputs} title="Edit User"/>}
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const statusColumn = [
    {
      field: "route",
      headerName: "Flight Route",
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            {params.row.departure}-{params.row.arrival}
          </div>
        );
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Crew
        <Link to="/transport/CabProviders" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={driverColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
            toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
            },
          }}
      />
    </div>
  );
};

export default DriverDatatable;
