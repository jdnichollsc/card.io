import React from 'react'
import StatusBadge from './StatusBadge'

import './CardListItem.css'

const CardListItem = ({
  name,
  network,
  last4,
  active,
  selected
}) => {
  const selectedClass = selected ? ' CardListItem--selected' : ''

  return (
    <div
      className={`CardListItem${selectedClass}`}
    >
      <div className="CardListItem__titleContainer">
        <div className="CardListItem__title heavyText">{name}</div>
        <StatusBadge
          active={active}
          disabled={!active}
        />
      </div>
      <div
        className="CardListItem__subtitle lightText"
      >
        {`${network} ending in ${last4}`}
      </div>
    </div>
  )
}

export default CardListItem