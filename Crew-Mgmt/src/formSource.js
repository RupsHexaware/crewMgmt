
const required = (value) => {
  //alert("Ss")
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export const userInputs = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "username",
    },
    {
      id: "displayName",
      label: "Name and Surname",
      type: "text",
      placeholder: "full name",
    },
    {
      id: "email",
      label: "Email",
      type: "mail",
      placeholder: "email",
    },
    {
      id: "answer",
      label: "what is your birth place?",
      type: "text",
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
    },
    {
      id: "Active From",
      label: "Active From",
      type: "date",
    }, 
    {
      id: "Active TO",
      label: "Active To",
      type: "date",
    },  
  ];

  export const userEditInputs = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "username",
    },
    {
      id: "email",
      label: "Email",
      type: "mail",
      placeholder: "email",
    },
 
  ];
  
  export const forgotInputs = [
    {
      id: "email",
      label: "Username",
      type: "email",
      placeholder: "Email",
    },  
    {
      id: "answer",
      label: "what is your birth place?",
      type: "text",
      placeholder: "Answer",
    },  
  ];

  export const loginInputs = [
    {
      id: "email",
      label: "Username",
      type: "email",
      placeholder: "Email",
    },  
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
    },  
  ]

  export const resetInputs = [
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
    },  
    {
      id: "confirmPassword",
      label: "Password",
      type: "password",
      placeholder: "Confirm Password",
    },  
  ]

  export const crewInputs = [
    {
      id: "airline",
      name : "airline",
      type: "text",
      placeholder: "Airline Name",
      errorMessage:
      "Airline should be 3-16 characters and shouldn't include any special character!",
      label: "Airline Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },  
    {
      id: "flightNo",
      name : "flightNo",
      type: "text",
      placeholder: "Flight No",
      errorMessage:
      "Flight No should be Alphanumeric ",
      label: "Flight No",
      pattern: "^[A-Z0-9]{0,8}$",
      required: true,
    }, 
    {
      id: "members",
      name : "members",
      type: "text",
      placeholder: "No of Members",
      errorMessage:
      " include Only Numbers !",
      label: "No of Members",
      pattern: "^[0-9]$",
      required: true,
    },  
    {
      id: "departure",
      name : "departure",
      type: "text",
      placeholder: "Departure from",
      errorMessage:
      " Required and only characters !",
      label: "Departure from",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
      
    },
    {
      id: "arrival",
      name : "arrival",
      type: "text",
      placeholder: "Arrival To",
      errorMessage:
      " Required and only characters !",
      label: "Arrival To",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },  
    {
      id: "flightDate",
      name : "flightDate",
      type: "date",
      //placeholder: "Arrival To",
      errorMessage:
      " Required and only characters !",
      label: "Flight Date",
      //pattern: "^[A-Za-z0-9]$",
      required: true,
    }, 
    {
      id: "flightArrivalTime",
      name : "flightArrivalTime",
      type: "time",
      //placeholder: "Arrival To",
      errorMessage:
      " Required and only characters !",
      label: "Filght Arrival Time",
      //pattern: "^[A-Za-z0-9]$",
      required: true,
    }, 
    {
      id: "flightDepartureTime",
      name : "flightDepartureTime",
      type: "time",
      //placeholder: "Arrival To",
      errorMessage:
      " Required and only characters !",
      label: "Filght Departure Time",
      //pattern: "^[A-Za-z0-9]$",
      required: true,
    }, 
    
  ]

  export const crewMemberInputs = [
    {
      id: "empName",
      label: "Employee Name",
      type: "text",
      placeholder: "Employee Name",
    },   
    {
      id: "dob",
      label: "Date Of Birth",
      type: "date",
      placeholder: "Date of birth",
    },  
    {
      id: "empCode",
      label: "User Id",
      type: "text",
      placeholder: "Employee Code",
    }, 
    {
      id: "gender",
      label: "Gender",
      type: "text",
      placeholder: "Gender",
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
      placeholder: "Phone",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      placeholder: "Address ",
    },
    {
      id: "city",
      label: "City",
      type: "text",
      placeholder: "City",
    },
    {
      id: "state",
      label: "State",
      type: "text",
      placeholder: "State",
    },
    {
      id: "pinCode",
      label: "Pin Code",
      type: "text",
      placeholder: "Pin Code",
    },
    {
      id: "requirements",
      label: "Additional Requirements",
      type: "text",
      placeholder: "Additional Requirements",
    },  
  ]