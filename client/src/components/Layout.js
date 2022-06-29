import {Outlet} from 'react-router-dom'
const Layout = () => {
  return (
    <main className="App d-flex justify-content-center">
        <Outlet />
    </main>
  )
}

export default Layout