import React from 'react'
import "components/Appointment/styles.scss"
import useVisualMode from 'hooks/useVisualMode'

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Status from './Status'
import Confirm from './Confirm'
import Form from './Form'
import Error from './Error';

function Appointment(props) {


  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function remove() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  function confirm() {
    transition(CONFIRM);
  };

  function edit() {
    transition(EDIT);
  }
  // console.log(props)

  return (

    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SHOW && (<Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirm}
        onEdit={edit}
      />)}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          onCancel={back}
          onConfirm={remove}
          message="Are you sure you want remove this appointment?"
        />}
      {mode === EDIT && <Form
        // name={props.name ? props.name : props.interview.student}
        // value={props.value ? props.value : props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back} />}
      {mode === ERROR_DELETE &&
        <Error
          message="Unable to remove this appointment"
          onClose={back}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          message="Unable to create an appointment"
          onClose={back}
        />
      }
    </article>
  )
}

export default Appointment
