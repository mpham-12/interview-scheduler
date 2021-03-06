export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(dayObj => dayObj.name === day);
  if (filteredAppointments.length === 0) {
    return [];
  } else {
    return filteredAppointments[0].appointments.map(appId => state.appointments[appId])
  }
}

export function getInterview(state, interview) {
  const interviewDetails = {};

  if (!interview) {
    return null;
  }
  else {
    interviewDetails.student = interview.student;
    interviewDetails.interviewer = state.interviewers[interview.interviewer];
    return interviewDetails;
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(item => item.name === day);
  if (filteredDay && filteredDay.interviewers.length !== 0) {
    return filteredDay.interviewers.map(app => state.interviewers[app])
  } else {
    return [];
  }
};