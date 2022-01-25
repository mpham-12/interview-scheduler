import React from "react"
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"

function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
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

export default InterviewerList
