import React from "react"
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
// import PropTypes from 'prop-types';

function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {/* {  console.log(props.interviewers)} */}
        {props.interviewers.map(person => {
          return <InterviewerListItem
            key={person.id}
            name={person.name}
            avatar={person.avatar}
            selected={person.id === props.value}
            setInterviewer={() => props.onChange(person.id)} />
        })}

      </ul>
    </section>
  )
}

// InterviewerList.propTypes = {
//   interviewers: PropTypes.array.isRequired
// };

export default InterviewerList;