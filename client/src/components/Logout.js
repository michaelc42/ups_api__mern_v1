import useAuth from "../hooks/useAuth"

const Logout = () => {
    const { auth, setAuth } = useAuth()
    setAuth(()=>[])
    return (
        <div>Logout</div>
    )
}

export default Logout