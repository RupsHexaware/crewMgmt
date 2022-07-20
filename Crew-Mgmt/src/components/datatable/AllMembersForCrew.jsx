import "./datatable.scss";
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { crewMembersListForCrew } from "../../datatablesource";
import { Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import {
  collection,
  setDoc,
  deleteDoc,
  doc,
  onSnapshot,serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import FormInput from "../commonInput/FormInput";
import FormButton from "../commonInput/FormButtons";
import { uuid } from "uuidv4";

const AllCrewMembers = () => {
    const { flightId } = useParams()
  const [data, setData] = useState([]);
  const [prvData, setprvData] = useState([]);
  const [flightNo, setflightNo] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [Date,setDate] = useState("");

//console.log(flightId)
  useEffect(() => {
    const res = onSnapshot(collection(db, "flight_schedule"),
    (snapShot) =>{
      snapShot.docs.forEach((doc)=>{
        const newDoc = doc.data();
        if(flightId === newDoc.itemID){
          setflightNo(newDoc)
        }
      })
    })
  }, []);
  //console.log(flightNo)


const PopulateList = (e) =>{
  //alert("Dtae")
  //console.log(flightNo.Date)
  //e.preventDefault();
  const res = onSnapshot(
    collection(db,"allotedCrewForFlight"),
    (snapShot) =>{
      let list = [];
      snapShot.docs.forEach((doc) =>{
        const old = doc.data();
        //console.log(old.flightDate)
        //list.push(old)
        setprvData(old)
        console.log(Date+"+++++"+old.flightDate)
        if(Date === old.flightDate){
          onSnapshot(
            collection(db, "crewMembers"),
            (snapShot) => {
              let list = [];
              snapShot.docs.forEach((doc) => {
                const newData = doc.data();
                console.log(doc.id +"-------"+old.memberId)
                  if(newData.id === old.memberId){
                    list.push({ id: doc.id, ...doc.data() });
                  } 
              });
              setData(list);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
      //setprvData(list);
      //console.log("Previous Date"+prvData.flightDate)
    }
  );
 
  const unsub = onSnapshot(
    collection(db, "crewMembers"),
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
}
const handleSave =(e) =>{
 // const id = uuid();
  const pp = JSON.stringify(selectedRows, null, 4)
  console.log(selectedRows)
  //e.preventDefault();
  // try {
  //   const id = uuidv4();
  //   const res = await setDoc(doc(db, "crewDetails",id), {
  //     ...data,
  //     timeStamp: serverTimestamp(),
  //   });
  //   navigate(-1)
  // } catch (err) {
  //   console.log(err);
  // }
}
//alert(JSON.stringify(selectedRows, null, 4))
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Crew Members List
      </div>
      <div className="SearchDiv">
      
        <FormInput type="text" label="Flight No"  value={flightNo.FlightNo}
                  placeholder={"Flight No"}
                  onChange={(e) => setflightNo(e.target.value)} disabled/>
        <FormInput type="date" label="Select Date" value={Date} onChange={(e)=>{setDate(e.target.value); PopulateList()}}/>
        {/* <FormButton className="link" type="submit" onClick={handleSave}>Save</FormButton> */}
      </div>
     
      <DataGrid
        className="datagrid"
        rows={data}
        columns={crewMembersListForCrew}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = data.filter((row) =>
            selectedIDs.has((row.id).toString()),
          );
         // setSelectedRows(selectedRowData);
          //handleSave();
          //console.log(selectedRowData)
         const empIdList = [];
         const id = uuidv4();
          selectedRowData.map((e) => {
                    //console.log(e.id)
                  empIdList.push(e.id);
                  setDoc(doc(db ,"allotedCrewForFlight" , id),{
                    flightDate : Date,
                    memberId : e.id,
                    flightid : flightId,
                    empName : e.empName,
                    empCode : e.empCode,
                    email : e.email,
                    gender : e.gender,
                    status : e.status,
                    requirements : e.requirements,
                    FlightDeparture : flightNo.Departure,
                    FlightArrival : flightNo.Arrival,
                    Origin : flightNo.Origin,
                    Destination : flightNo.Destination

                  })
                  console.log("Crew Added")
                  });
                //console.log(empIdList)
                setSelectedRows(empIdList)
        }}
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

export default AllCrewMembers;
