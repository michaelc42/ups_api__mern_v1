import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

//Checks if user is authorized, if so sets messages in React Dev Tools "Logged In" or "...Out"
//Returns AuthContext with default values of [auth, setAuth]
const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;