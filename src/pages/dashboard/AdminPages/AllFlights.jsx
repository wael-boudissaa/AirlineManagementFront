import React from 'react'
import { Sidenav } from '../../../widgets/Sidenav'
import TableFlights from '../../../widgets/Tables/TableFlights'

const AllFlights = () => {
  return (
    <div className='flex flex-row justify-between'>
      <Sidenav/>
      <TableFlights/>

    </div>
  )
}

export default AllFlights