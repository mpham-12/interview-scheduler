import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  function handleClick() {
    props.setDay(props.name);
  }

  function formatSpots(numOfSpots) {
    if (numOfSpots === 0) {
      return 'no spots remaining'
    }
    else if (numOfSpots === 1) {
      return '1 spot remaining'
    }
    else {
      return `${numOfSpots} spots remaining`
    }
  };

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });

console.log(props)
  return (
    <li className={dayClass} onClick={handleClick}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}