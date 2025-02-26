// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);
//     const [wishlist, setWishlist] = useState([]);

//     useEffect(() => {
//         const userId = localStorage.getItem("userId");
//         if (userId) {
//             axios.get(`http://localhost:5000/api/cart/cart/${userId}`).then(res => setCart(res.data));
//             axios.get(`http://localhost:5000/api/cart/wishlist/${userId}`).then(res => setWishlist(res.data));
//         }
//     }, []);

//     const addToCart = (userId, productId, quantity) => {
//         axios.post("http://localhost:5000/api/cart/cart/add", { userId, productId, quantity })
//             .then(res => setCart([...cart, res.data]))
//             .catch(error => console.error(error));
//     };

//     const addToWishlist = (userId, productId) => {
//         axios.post("http://localhost:5000/api/cart/wishlist/add", { userId, productId })
//             .then(res => setWishlist([...wishlist, res.data]))
//             .catch(error => console.error(error));
//     };

//     return (
//         <CartContext.Provider value={{ cart, wishlist, addToCart, addToWishlist }}>
//             {children}
//         </CartContext.Provider>
//     );
// };
