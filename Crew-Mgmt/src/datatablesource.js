
export const userColumns = [
  { field: "id", headerName: "ID", width: 100 ,hide:true},
  
  { field: "userid", headerName: "ID", width: 100 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img
                  ? params.row.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              } alt="Avtar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "role",
    headerName: "Role",
    width: 150,
  }
];

export const crewMembersColumns = [
  { field: "id", headerName: " User ID", width: 100,hide: true},
  { field: "empCode", headerName: " Emp ID", width: 100,},
  {
    field: 'empName',
    headerName: "Employee Name",
    width: 230,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 200,
  },
  {
    field: "requirements",
    headerName: "Additional Requirements",
    width: 230,
  },
];
export const crewMembersList = [
  { field: "id", headerName: " User ID", width: 100,hide: true},
  { field: "empCode", headerName: " Emp ID", width: 100,},
  {
    field: 'empName',
    headerName: "Employee Name",
    width: 230,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Contact No",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "flightNo",
    headerName: "Assigned Flight No",
    width: 230,
  },
];

const  u = {
  departure : "departure",
  arrival : "arrival"
}
export const crewColumns = [
  { field: "id", headerName: "ID", width: 100, hide: true},
  {
    field: "airline",
    headerName: "Airline",
    width: 150,
  },
  {
    field: "flightNo",
    headerName: "Flight No",
    width: 150,
  },
  {
    field: "members",
    headerName: "Crew Members",
    width: 150,
  },
  {
    field: "flightDate",
    headerName: "Flight Date",
    width: 150,
  },
  {
    field: "flightArrivalTime",
    headerName: "Flight Time",
    width: 150,
  }
];

export const RoasterColumns = [
  {
    field: "flightNo",
    headerName: "Flight No",
    width: 150,
  },
  {
    field: "departure",
    headerName: "Departure",
    width: 150,
  },
  {
    field: "arrival",
    headerName: "Arrival",
    width: 150,
  },
  {
    field: "members",
    headerName: "Crew Members",
    width: 150,
  },
  {
    field: "flightDate",
    headerName: "Date",
    width: 150,
  },
  {
    field: "flightDepartureTime",
    headerName: "Departure Time",
    width: 150,
  },
  {
    field: "flightArrivalTime",
    headerName: "Arrival Time",
    width: 150,
  },

];
