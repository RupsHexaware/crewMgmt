import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CrewRoster = () => {
    const {t} = useTranslation();
const currentDate = new Date();
const schedulerData = [
  { startDate: '2022-07-18 08:15', title: 'Departure From Mumbai Airport' },
  { startDate: '2022-07-18 09:25', title: 'Arrival at Pune Airport' },
  { startDate: '2022-07-18 09:45', title: 'pick Up from Pune Airport' },
  { startDate: '2022-07-18 11:00', title: 'Drop at Hotel Radison' },
];
const [data , setData] = useState();
const [currentViewName, setcurrentViewName] = useState();

    return(
        <div className="datatable">
          <div className="datatableTitle">
            {t("crRostr")}
          </div>
    <Paper>
    <Scheduler
      data={schedulerData}
      height={660}
    >
      <ViewState
        defaultCurrentDate={currentDate}
        currentViewName={currentViewName}
        //onCurrentViewNameChange={currentViewNameChange}
      />

      <WeekView
        startDayHour={0}
        endDayHour={24}
      />
      <MonthView />
      <DayView />

      <Toolbar />
      <ViewSwitcher />
      <Appointments />
    </Scheduler>
  </Paper>
  </div>
  )
}
export default CrewRoster
