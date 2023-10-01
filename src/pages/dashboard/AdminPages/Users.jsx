import React from 'react'
import { Sidenav } from '../../../widgets/Sidenav'
import TableProfile from '../../../widgets/Tables/TableProfile'

const Users = () => {
  return (
    <div className='flex flex-row justify-between'>
       <Sidenav/>
       <TableProfile/>
    </div>
  )
}

export default Users