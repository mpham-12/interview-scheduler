import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  function setDay(dayName) {
    setState({ ...state, day: dayName })
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
      )
    }
    )
  }, [])

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        setState((prev) => ({ ...prev, appointments }));
        updateSpots();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then((res) => {
        setState((prev) => ({ ...prev, appointments }));
        updateSpots();
      })

  }


  function updateSpots() {
   
    setState((prev) => {
      const ApptForDays = getAppointmentsForDay(prev, prev.day);
      const openSpots = ApptForDays.filter((appt) => !appt.interview).length;
      const day = prev.days.find(dayObj => dayObj.name === prev.day);
      const dayIndex = prev.days.indexOf(day);
      prev.days[dayIndex] = { ...day, spots: openSpots }
      console.log('prev.days----', prev.days[dayIndex])
      return {
        ...prev,
        days: [...prev.days],
      }
    })




    // const selectedDay = selectDay(state.day)
    // state.days[selectDay.spots]
    // let day = {
    //   ...state.days[selectedDay],
    //   spots: state.days[selectedDay]
    // }

    // let days = state.days;
    // days[selectedDay] = day;

    // if (!state.appointments[id].interview) {
    //   day = {
    //     ...state.days[selectedDay],
    //     spots: state.days[selectedDay].spots - 1
    //   }
    // } else {
    //   day = {
    //     ...state.days[selectedDay],
    //     spots: state.days[selectedDay].spots + 1
    //   }
    // }

    // return axios.put(`/api/appointments/${id}`)
    //   .then((res) => {
    //     console.log(res);
    //     setState((prev) => ({ ...prev, days }));
    //   })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  }
}