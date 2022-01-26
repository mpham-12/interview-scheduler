import React, { useState, useEffect } from "react";
import Button from "./Button";

import "components/Application.scss";
import "components/Appointment";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {


  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
            day={state.day}
            value={state.day}
            onChange={setDay}
            bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {schedule}

        <Appointment key="last" time="5pm" bookInterview={bookInterview} cancelInterview={cancelInterview} />
      </section>
      <Button></Button>
    </main>
  );
}
