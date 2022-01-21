export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(dayObj => dayObj.name === day);

  if (filteredAppointments.length === 0) {
    return [];
  } else {
    return filteredAppointments[0].appointments.map(appId => state.appointments[appId])
  }
}



