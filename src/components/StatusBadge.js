import React from 'react'

import './StatusBadge.css'

const StatusBadge = ({active, disabled}) => {
  if (active) {
    return (
      <div className="StatusBadge StatusBadge--active">
        Active
      </div>
    )
  }
  if (disabled) {
    return (
      <div className="StatusBadge StatusBadge--disabled">
        Disabled
      </div>
    )
  }
  return null
}

export default StatusBadge
