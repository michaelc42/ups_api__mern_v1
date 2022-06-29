
import { createContext, useState } from "react";

const CartContext = createContext();

// export const ContextProvider = ({ children }) => {
//     const [cart, setCart] = useState();
//     //const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

//     return (
//         //<AuthContext.Provider value={{ auth, setAuth,  persist, setPersist }}>
//         <CartContext.Provider value={{ cart, setCart }}>
//             {children}
//         </CartContext.Provider>
//     )
// }

export default CartContext;