import "./datatable.scss";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { crewMembersColumns } from "../../datatablesource";
import { Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const CrewMemberDatatable = () => {
    const { crewId } = useParams()
  const [data, setData] = useState([]);
//console.log(crewId)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "crewMembers"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
            const newDoc = doc.data();
            if(crewId === newDoc.crewId){
                list.push({ id: doc.id, ...doc.data() });
            }
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
      await deleteDoc(doc(db, "crewMembers", id));
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
            {/* <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
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
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Crew Members List
        <Link to={`/airline/newCrewMembers/${crewId}`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={crewMembersColumns.concat(statusColumn,actionColumn)}
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

export default CrewMemberDatatable;
