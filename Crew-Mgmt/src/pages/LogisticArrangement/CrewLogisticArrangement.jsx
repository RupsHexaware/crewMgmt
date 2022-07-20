import React from 'react'
import Sidebar from "../../components/sidebar/AirlineSidebar";
import Navbar from "../../components/navbar/Navbar";
import FormInput from "../../components/commonInput/FormInput";
import { logisticCrewInput } from "../../formSource";
import Dropdowm from '../../components/commonInput/FormDropdown';

const CrewLogisticArrangement = ({title}) => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form >
              {logisticCrewInput.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    // value={data[input.name]}
                    // onChange={handleInput}
                  />
              ))}
              <button type="submit" class="btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrewLogisticArrangement
