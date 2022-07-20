import "./datatable.scss";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { crewColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userInputs } from "../../formSource";
import { useTranslation } from "react-i18next";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import Edituser from "../../pages/edit/EditUser";

const CrewListForLogistic = () => {
  const [data, setData] = useState([]);
  const [editBox , seteditBox] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "rosterDetails"),
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
      await deleteDoc(doc(db, "rosterDetails", id));
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
            <Link to={`/airline/logisticArrangement/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Create Request</div>
            </Link>
          </div>
        );
      },
    },
  ];
  const routeColumn = [
    {
      field: "route",
      headerName: "Flight Route",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.departure}-{params.row.arrival}
          </div>
        );
      },
    },
  ]
  const dateColumn = [
    {
      field: "date",
      headerName: "Flight Date & Time",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.date}-{params.row.arrivalTime}
          </div>
        );
      },
    },
  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
      {t("logisticArrangement")} 
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={crewColumns.concat(routeColumn,dateColumn,actionColumn)}
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

export default CrewListForLogistic;
