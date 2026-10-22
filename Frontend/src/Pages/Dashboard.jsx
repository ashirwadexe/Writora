import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user ? <p>User is logged in </p> : <p>login kro bhai login nhi ho</p>}
    </div>
  )
}

export default Dashboard