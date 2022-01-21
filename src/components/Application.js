import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";




const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];


export default function Application(props) {
  // const [day, setDay] = useState('Monday')
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const dailyAppointments = [];

  function setDay(dayName) {
    setState({ ...state, day: dayName })
  }

  function setDays(days) {
    setState(prev => ({ ...prev, days }));

  }

  useEffect(() => {
    axios.get('/api/days').then(res => {
      setDays(res.data)
    })
  }, []);

// Promise.all([
//   axios.get('/api/days'),
//   axios.get('/api/appointments'),
//   axios.get('/api/interviewers'),
// ]).then((all)=>{
//   console.log(all[0]); // first
//   console.log(all[1]); // second
//   console.log(all[2]); // third
//   const [first, second, third] = all;

//   console.log(first, second, third);
// })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(app => {
          return <Appointment key={app.id} {...app} />
        })}
        <Appointment key="last" time="5pm" />
      </section>
      <Button></Button>
    </main>
  );
}
