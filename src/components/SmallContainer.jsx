import React from 'react'

function SmallContainer({children}) {
  return (
    <div className="mx-0 sm:mx-6">{children}</div>
  )
}

export default SmallContainer