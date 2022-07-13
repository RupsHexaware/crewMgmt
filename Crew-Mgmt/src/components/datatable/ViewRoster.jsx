
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
import { RoasterColumns } from "../../datatablesource";
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

const ViewRoster = () => {
    const { crewId } = useParams()
  const [data, setData] = useState([]);
  const [showZebraRows, setShowZebraRows] = useState(true)
//console.log(crewId)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "rosterDetails"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
            const newDoc = doc.data();
           // if(crewId === newDoc.crewId){
                list.push({ id: doc.id, ...doc.data() });
            //}
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
      await deleteDoc(doc(db, "rosterDetails", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const dateColumn = [
    {
      field: "date",
      headerName: "Flight Date",
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            {params.row.date}
          </div>
        );
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
       Roaster
        {/* <Link to={`/airline/newCrewMembers/${crewId}`} className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={RoasterColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        components={{ Toolbar: GridToolbar
        }}
        componentsProps={{
            toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
      />
    </div>
  );
};

export default ViewRoster
