// import { useRef, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
// import useAuth from '../hooks/useAuth'

// const Admin = () => {
//   const LOGIN_URL = 'http://localhost:3001/api/v1/jobs';
//   const { auth } = useAuth()
//   const [allJobs, setAllJobs] = useState({})
//   const handleClick = async (e) => {
//     e.preventDefault()
//     try {
//       const response = await fetch(LOGIN_URL, {
//         method: 'GET', // or 'PUT'
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${auth.accessToken}`
//         }
//       })
//       const data = await response.json()
//       setAllJobs(data.jobs)
      
//       console.log(allJobs)
//     } catch (error) {
//         console.log(error.message)
//     }
//   }

//   return (
//     <div>
//       <p>Admin</p>
//       <button onClick={(e) => handleClick(e)}>Submit</button>
//       <Link to="./testpath">Test</Link>
//       <Link to="/dashboard">User Dashboard</Link>

//     </div>
//   )
// }

// export default Admin